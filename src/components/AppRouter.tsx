import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from '../pages';
import { useRenderWatcher } from '../hooks/useRenderWatcher';

const AppRouter: FC = () => {

    useRenderWatcher('AppRouter');
    return (
        <Routes>
            { routesConfig.map(({ path, Element }) => (
                <Route
                    path={ path }
                    element={ <Element /> }
                    key={ path }
                />
            )) }
        </Routes>
    );
};

export default AppRouter;
