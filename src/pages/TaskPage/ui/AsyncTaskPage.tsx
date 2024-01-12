import { lazy } from 'react';

export const AsyncTaskPage = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            setTimeout(() => resolve(import('./TaskPage')), 150000);
        })
);
