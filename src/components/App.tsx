import { FC } from 'react';
import { useAppSelector } from '../hooks/redux';
import { usePageStateSetUp } from '../hooks/usePageStateSetUp';
import AppRouter from './AppRouter';
import { useRenderWatcher } from '../hooks/useRenderWatcher';



const App: FC = () => {
    const isAppReady = useAppSelector(({ app }) => app.isAppReady);
    const path = usePageStateSetUp();

    useRenderWatcher('App', [ isAppReady, path ]);
    return (
        <>
            { isAppReady ? <AppRouter /> : null }
        </>
    );
};

export default App;
