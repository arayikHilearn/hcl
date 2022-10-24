import { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { usePageStateSetUp } from '../hooks/usePageStateSetUp';
import AppRouter from './AppRouter';
import Navbar from './Navbar';
import { useStyle } from '../hooks/useStyle';

const App: FC = () => {
    const isAppReady = useAppSelector( ( { app } ) => app.isAppReady );
    const path = usePageStateSetUp();

    useEffect( () => {
        console.log( 'RENDER==App', { isAppReady, path } );
    } );

    //if (!isAppReady) return <h1>GAGO</h1>
    return (
        <div>
            <Navbar />
            <div>
                { isAppReady && <AppRouter /> }
            </div>
        </div>
    );
};

export default App;
