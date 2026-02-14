import { mockLots, mockApplications } from '@/data/mockData';

export const gasRequest = async <T>(functionName: string, ...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
        // Check if we are in the Google Apps Script environment
        if (typeof google !== 'undefined' && google.script && google.script.run) {
            google.script.run
                .withSuccessHandler((result: any) => resolve(result as T))
                .withFailureHandler((error: any) => reject(error))
            [functionName](...args);
        } else {
            // Development mode / Mocking
            console.warn(`[GAS] Mocking call to ${functionName} with args:`, args);

            // Simulação de delay para maior realismo no desenvolvimento
            setTimeout(() => {
                if (functionName === 'getDataFromSheet') {
                    const sheetName = args[0];
                    if (sheetName === 'Lotes') return resolve(mockLots as unknown as T);
                    if (sheetName === 'Aplicacoes') return resolve(mockApplications as unknown as T);
                    return resolve([] as unknown as T);
                }

                if (functionName === 'syncDataFromApp') {
                    return resolve({ success: true } as unknown as T);
                }

                resolve({} as unknown as T);
            }, 500);
        }
    });
};

