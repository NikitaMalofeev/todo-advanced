import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '../../../share/ui/Loader/Loader';
import { MainPage } from '../../../pages/MainPage/ui/MainPage';
import { AsyncTaskPage } from '../../../pages/TaskPage/ui/AsyncTaskPage';

const AppRouter = () => (
    <Routes>
        <Route
            path="/"
            element={
                <Suspense fallback={<Loader />}>
                    <MainPage />
                </Suspense>
            }
        />
        <Route
            path="/task"
            element={
                <Suspense fallback={<Loader />}>
                    <AsyncTaskPage />
                </Suspense>
            }
        />
    </Routes>
);

export default AppRouter;
