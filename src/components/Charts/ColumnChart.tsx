import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { ColumnChartConfig } from '../../config/ChartConfig';
import { useCallOnResize } from '../../hooks/useCallOnResize';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import ColumnChartLabels from './ChartLabels';
import styles from 'src/styles/components/ColumnChart.module.scss';
import { useAppSelector } from '../../hooks/redux';
import ChartsSelectors from '../../store/selectors/ChartsSelector';
import { ChartsCategoryList } from '../../models/calculateResponse';

const chartConfig = new ColumnChartConfig({ $pointWidth: 10.7 });

const ColumnChart: FC<{style?: CSSProperties, category: typeof ChartsCategoryList[number]}> = (
    { style = {}, category }
) => {
    const selector = useMemo(() => ChartsSelectors.AnnualPaymentSelector(category), [ category ]);
    const data = useAppSelector(selector);
    const [ config, setConfig ] = useState(() => chartConfig.chartSetup(data));

    useCallOnResize(() => setConfig(chartConfig.chartSetup(data)), 150);

    useRenderWatcher('ColumnChart', [ category ]);
    return  (
        <div
            style={ style }
            className={ styles['chart-wrapper'] }
        >
            <ColumnChartLabels
                width={ config.chartOuterWidth }
                padding={ config.chartPadding }
                title="Yearly payments"
                dataLabels={ [
                    [ { text: 'HCL out of pocket payment', colorIndex: 1, type: 'circle' } ],
                    [ { text: 'Conventional out of pocket payment', colorIndex: 2, type: 'circle' } ]
                ] }
            />
            <HighchartsReact
                highcharts={ Highcharts }
                options={ config.options }
            />
        </div>
    );
};

export default ColumnChart;
