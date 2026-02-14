import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TemperatureWidget } from '@/components/dashboard/TemperatureWidget';
import { LotStatusTable } from '@/components/dashboard/LotStatusTable';
import { RecentApplications } from '@/components/dashboard/RecentApplications';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useVaccineData } from '@/hooks/VaccineContext';
import { Package, Syringe, Calendar, ShieldAlert, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { lots, applications, stats, loading } = useVaccineData();

  if (loading || !stats) {
    return (
      <MainLayout title="Dashboard" subtitle="Carregando dados...">
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  const lotsNeedingAttention = lots.filter(
    (lot) => lot.status === 'critical' || lot.status === 'low'
  );

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Sistema de Gestão de Imunobiológicos - UBS Centro"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Doses Disponíveis"
            value={stats.availableDoses}
            subtitle={`${stats.totalLots} lotes ativos`}
            icon={<Package className="h-6 w-6" />}
          />
          <StatCard
            title="Aplicações Hoje"
            value={stats.applicationsToday}
            icon={<Syringe className="h-6 w-6" />}
            trend={{ value: 0, isPositive: true }}
          />
          <StatCard
            title="Vencendo em 30 dias"
            value={stats.expiringIn30Days}
            subtitle="Lotes próximos ao vencimento"
            icon={<Calendar className="h-6 w-6" />}
            variant="warning"
          />
          <StatCard
            title="Estoque Crítico"
            value={stats.criticalStock}
            subtitle="Requer ação imediata"
            icon={<ShieldAlert className="h-6 w-6" />}
            variant="danger"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Temperature Widget and Quick Actions */}
          <div className="space-y-6">
            <TemperatureWidget
              temperature={stats.lastTemperature}
              status={stats.temperatureStatus}
              lastUpdate="08:00"
            />
            <QuickActions />
          </div>

          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <RecentApplications applications={applications} />
          </div>
        </div>

        {/* Lots Table */}
        {lotsNeedingAttention.length > 0 && (
          <LotStatusTable lots={lotsNeedingAttention} />
        )}
      </div>
    </MainLayout>
  );
}
