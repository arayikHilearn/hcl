import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CSSProperties, FC, useState } from 'react';
import { LineChartConfig } from '../../config/ChartConfig';
import { useCallOnResize } from '../../hooks/useCallOnResize';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import ColumnChartLabels from './ColumnChartLabels';
import styles from 'src/styles/components/ColumnChart.module.scss';
import { useAppSelector } from '../../hooks/redux';
import ChartsSelectors from '../../store/selectors/chartsSelector';

const chartConfig = new LineChartConfig();


const LineChart: FC<{style?: CSSProperties}> = ({ style = {} }) => {
    const area = useAppSelector(ChartsSelectors.CumulativePaymentSelector);
    const line = useAppSelector(ChartsSelectors.LoanBalanceSelector);
    const [ config, setConfig ] = useState(() => chartConfig.chartSetup({ area, line }));

    useCallOnResize(() => setConfig(chartConfig.chartSetup({ area, line })), 150);

    console.log(config, 33333, { area, line });

    useRenderWatcher('ColumnChart');
    return  (
        <div
            style={ style }
            className={ styles['chart-wrapper'] }
        >
            <ColumnChartLabels
                width={ config.chartOuterWidth }
                padding={ config.chartPadding }
                title="Chart Two"
                dataLabels={ [
                    [
                        { text: 'HCL cumulative payments', colorIndex: 1, type: 'line' },
                        { text: 'Conventional cumulative payments', colorIndex: 2, type: 'line' }
                    ],
                    [
                        { text: 'HCL loan balance', colorIndex: 1, type: 'dash' },
                        { text: 'Conventional loan balance', colorIndex: 2, type: 'dash' }
                    ]
                ] }
            />
            <HighchartsReact
                highcharts={ Highcharts }
                options={ config.options }
            />
        </div>
    );
};

export default LineChart;
