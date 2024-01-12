import { BrowserRouter } from 'react-router-dom';
import AppRouter from './providers/router/AppRouter';
import { Suspense } from 'react';
import { Loader } from '../share/ui/Loader/Loader';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Suspense fallback={<Loader />}>
                    <div className="content-page">
                        <AppRouter />
                    </div>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export { App };
