import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { LineChartConfig } from '../../config/ChartConfig';
import { useCallOnResize } from '../../hooks/useCallOnResize';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import ColumnChartLabels from './ChartLabels';
import styles from 'src/styles/components/ColumnChart.module.scss';
import { useAppSelector } from '../../hooks/redux';
import ChartsSelectors from '../../store/selectors/ChartsSelector';
import { ChartsCategoryList } from '../../models/calculateResponse';

const chartConfig = new LineChartConfig();


const LineChart: FC<{style?: CSSProperties, category: typeof ChartsCategoryList[number]}> = ({
    style = {},  category
}) => {
    const selectorArea = useMemo(() => ChartsSelectors.CumulativePaymentSelector(category), [ category ]);
    const selectorLine = useMemo(() => ChartsSelectors.LoanBalanceSelector(category), [ category ]);
    const area = useAppSelector(selectorArea);
    const line = useAppSelector(selectorLine);
    const [ config, setConfig ] = useState(() => chartConfig.chartSetup({ area, line }));

    useCallOnResize(() => setConfig(chartConfig.chartSetup({ area, line })), 150);

    useRenderWatcher('LineChart', [ category ]);
    return  (
        <div
            style={ style }
            className={ styles['chart-wrapper'] }
        >
            <ColumnChartLabels
                width={ config.chartOuterWidth }
                padding={ config.chartPadding }
                title="Balances"
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
