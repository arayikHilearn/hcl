import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from '../pages';

const AppRouter: FC = () => {

    useEffect( () => {
        console.log( 'AppRouter::OnMount' );
    }, [] );

    return (
        <Routes>
            { routesConfig.map( ( { path, Element } ) => (
                <Route
                    path={ path }
                    element={ <Element /> }
                    key={ path }
                />
            ) ) }
        </Routes>
    );
};

export default AppRouter;