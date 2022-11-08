import { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { usePageStateSetUp } from '../hooks/usePageStateSetUp';
import AppRouter from './AppRouter';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import { useStyle } from '../hooks/useStyle';



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
