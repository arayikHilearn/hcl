import { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { usePageStateSetUp } from '../hooks/usePageStateSetUp';
import AppRouter from './AppRouter';
// import Navbar from './Navbar';
import { useStyle } from '../hooks/useStyle';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const borderRadius = require('highcharts-border-radius');
// borderRadius(Highcharts);

const options: Options | any = {
    accessibility: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'My chart'
    },
    // yAxis: {
    //     reversed: true
    // },
    legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom',
    },
    chart: {
        type: 'column',
        //margin: 20,
    },
    yAxis: {
        title: {
            text: '# completed',
            // align: 'high',
            // textAlign: 'left',
            // rotation: 0,
            // offset: 0,
            // margin: 0,
            // y: 12,
            // x: -7
        },
        minorTickLength: 0,
        tickLength: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
        //visible: false,
        labels: {
            //enabled: false
            //categories: [ 'apple', 'orange', 'mango' ],
        }
    },
    xAxis: {
        title: {
            text: '# completed',
            // align: 'high',
            // textAlign: 'left',
            // rotation: 0,
            // offset: 0,
            // margin: 0,
            // y: 12,
            // x: -7
        },
        //visible: false,
        //startOnTick: true,
        endOnTick: true,
        labels: {
            //enabled: false,
            //categories: [ 'apple', 'orange', 'mango' ],
        },
        minorTickLength: 0,
        tickLength: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineColor: 'transparent',
        lineColor: 'transparent',
        // minPadding: 0.1,
        // maxPadding: 0.1,
    },
    plotOptions: {
        column: {
            borderRadius: '10px',
            grouping: false,
            // borderRadiusTopLeft: 10,
            // borderRadiusTopRight: 10,
            borderWidth: 0,
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        },
    },
    series: [
        {
            showInLegend: false,
            //dashStyle: 'Dash',
            type: 'column',
            data: [ 5, 2 ]
        },
        {
            showInLegend: false,
            //dashStyle: 'Dash',
            type: 'column',
            data: [ 3, 4 ]
        },
        {
            showInLegend: false,
            //dashStyle: 'Dash',
            type: 'column',
            data: [
                { x: 2, y: 8 },
                { x: 2, y: 6 },
            ]
        }
    ],
};

const App: FC = () => {
    const isAppReady = useAppSelector(({ app }) => app.isAppReady);
    const path = usePageStateSetUp();

    useEffect(() => {
        console.log('RENDER==App', { isAppReady, path });
    });

    //if (!isAppReady) return <h1>GAGO</h1>
    return (
        <>
            { isAppReady ? <AppRouter /> : null }
            <div>
                <HighchartsReact
                    highcharts={ Highcharts }
                    options={ options }
                />
            </div>
        </>
    );
};

export default App;
