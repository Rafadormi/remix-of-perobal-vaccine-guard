/// <reference types="vite/client" />

declare var google: {
    script: {
        run: {
            withSuccessHandler(handler: (result: any) => void): any;
            withFailureHandler(handler: (error: any) => void): any;
            [key: string]: any;
        };
    };
};

