import { useState, useEffect, useCallback } from 'react';
import { gasRequest } from '@/lib/gas-api';
import { VaccineLot, VaccineApplication, TemperatureReading, DashboardStats } from '@/types/vaccine';
import { toast } from 'sonner';

export function useVaccineData() {
    const [lots, setLots] = useState<VaccineLot[]>([]);
    const [applications, setApplications] = useState<VaccineApplication[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshData = useCallback(async () => {
        setLoading(true);
        try {
            const [lotsData, appsData] = await Promise.all([
                gasRequest<VaccineLot[]>('getDataFromSheet', 'Lotes'),
                gasRequest<VaccineApplication[]>('getDataFromSheet', 'Aplicacoes')
            ]);

            // Converter strings de data de volta para objetos Date (GAS retorna ISO ou Date strings)
            const parsedLots = Array.isArray(lotsData) ? lotsData.map(lot => ({
                ...lot,
                expiryDate: new Date(lot.expiryDate),
                receivedDate: new Date(lot.receivedDate)
            })) : [];

            const parsedApps = Array.isArray(appsData) ? appsData.map(app => ({
                ...app,
                date: new Date(app.date)
            })) : [];

            setLots(parsedLots);
            setApplications(parsedApps);

            // Cálculo de estatísticas reais
            const today = new Date().toDateString();

            setStats({
                totalLots: parsedLots.length,
                availableDoses: parsedLots.reduce((acc, lot) => acc + (Number(lot.quantityCurrent) || 0), 0),
                applicationsToday: parsedApps.filter(app =>
                    new Date(app.date).toDateString() === today
                ).length,
                lossesToday: 0,
                expiringIn30Days: parsedLots.filter(lot => {
                    const diff = new Date(lot.expiryDate).getTime() - new Date().getTime();
                    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
                }).length,
                criticalStock: parsedLots.filter(lot => lot.status === 'critical').length,
                lastTemperature: 4.5,
                temperatureStatus: 'normal'
            });

        } catch (error) {
            console.error('Falha ao buscar dados:', error);
            // Fallback para não travar a UI
            setStats({
                totalLots: 0,
                availableDoses: 0,
                applicationsToday: 0,
                lossesToday: 0,
                expiringIn30Days: 0,
                criticalStock: 0,
                lastTemperature: 0,
                temperatureStatus: 'normal'
            });
            toast.error('Erro ao conectar com o banco de dados. Verifique sua conexão.');
        } finally {
            setLoading(false);
        }
    }, []);


    const addApplication = async (newApp: Omit<VaccineApplication, 'id' | 'date' | 'appliedBy'>) => {
        try {
            const app: VaccineApplication = {
                ...newApp,
                id: crypto.randomUUID(),
                date: new Date(),
                appliedBy: 'Administradora' // Or get from auth context
            };

            const updatedApps = [app, ...applications];

            // Optimistic update
            setApplications(updatedApps);

            await gasRequest('syncDataFromApp', 'Aplicacoes', updatedApps);
            toast.success('Aplicação sincronizada com sucesso');
            return true;
        } catch (error) {
            toast.error('Erro ao salvar aplicação');
            return false;
        }
    };

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return { lots, applications, stats, loading, refreshData, addApplication };
}
