import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CSSProperties, FC, useState } from 'react';
import { ColumnChartConfig } from '../../config/ChartConfig';
import { useCallOnResize } from '../../hooks/useCallOnResize';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import ColumnChartLabels from './ColumnChartLabels';
import styles from 'src/styles/components/ColumnChart.module.scss';
import { useAppSelector } from '../../hooks/redux';
import ChartsSelectors from '../../store/selectors/chartsSelector';

const chartConfig = new ColumnChartConfig();


const ColumnChart: FC<{style?: CSSProperties}> = ({ style = {} }) => {
    const data = useAppSelector(ChartsSelectors.AnnualPaymentSelector);
    const [ config, setConfig ] = useState(() => chartConfig.chartSetup(data));

    useCallOnResize(() => setConfig(chartConfig.chartSetup(data)), 150);

    console.log(config, 33333, data);

    useRenderWatcher('ColumnChart');
    return  (
        <div
            style={ style }
            className={ styles['chartsData-wrapper'] }
        >
            <ColumnChartLabels
                width={ config.chartOuterWidth }
                padding={ config.chartPadding }
                title="Yearly payments"
                dataLabels={ [
                    { text: 'HCL out of pocket payment', colorIndex: 1 },
                    { text: 'Conventional out of pocket payment', colorIndex: 2 }
                ] }
            />
            <div style={{ position: 'relative' }}>
                <div style={{    position: 'absolute',
                    bottom: 16,
                    left: '305px',
                    zIndex: 10,
                    background: 'blueviolet',
                    height: '39px',
                    width: '30px',
                    opacity: 0.6
                }}
                >
                    <div style={{ background: '#342422', height: '8px' }}></div>
                    <div style={{ background: 'red', height: '12px' }}></div>
                </div>
                <div style={{    position: 'absolute',
                    top: '50%',
                    left: '56px',
                    zIndex: 10,
                    background: 'blueviolet',
                    height: '39px',
                    width: '8px',
                    opacity: 0.6
                }}
                >
                    <div style={{ background: '#342422', height: '8px' }}></div>
                    <div style={{ background: 'red', height: '12px' }}></div>
                </div>
                <div style={{    position: 'absolute',
                    top: '43%',
                    left: '25.5px',
                    zIndex: 10,
                    background: 'blueviolet',
                    height: '39px',
                    width: '8px',
                    opacity: 0.6
                }}
                >
                    <div style={{ background: '#342422', height: '8px' }}></div>
                    <div style={{ background: 'red', height: '12px' }}></div>
                </div>
                <HighchartsReact
                    highcharts={ Highcharts }
                    options={ config.options }
                />
            </div>
        </div>
    );
};

export default ColumnChart;
