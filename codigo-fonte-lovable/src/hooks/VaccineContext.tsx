import React, { createContext, useContext, ReactNode } from 'react';
import { useVaccineData as useVaccineDataHook } from '@/hooks/use-vaccine-data';

const VaccineDataContext = createContext<ReturnType<typeof useVaccineDataHook> | null>(null);

export function VaccineDataProvider({ children }: { children: ReactNode }) {
    const vaccineData = useVaccineDataHook();
    return (
        <VaccineDataContext.Provider value={vaccineData}>
            {children}
        </VaccineDataContext.Provider>
    );
}

export function useVaccineData() {
    const context = useContext(VaccineDataContext);
    if (!context) {
        throw new Error('useVaccineData must be used within a VaccineDataProvider');
    }
    return context;
}
