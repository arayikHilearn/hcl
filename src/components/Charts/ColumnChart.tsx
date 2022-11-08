import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC } from 'react';
import { ColumnChartConfig } from '../../config/ChartConfig';

const data = [
    [
        70, 80, 60, 40, 30,
        40, 30, 70, 80, 60,
        40, 30, 40, 30, 70,
        80, 60, 40, 30, 10,
        30, 70, 80, 60, 40,
        30, 40, 30, 40, 70
    ],
    [ 50, 40, 80, 70, 30 ],
];

const chartConfig = new ColumnChartConfig();

const ColumnChart: FC = () => {
    return  (
        <div style={{ position: 'relative' }}>
            <div style={{    position: 'absolute',
                bottom: 0,
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
                left: '15.5px',
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
                options={ chartConfig.getChartOptions(data) }
            />
        </div>
    );
};

export default ColumnChart;

// [        71550.37182718472,
//     27186.52137039857,
//     41825.99104196185,
//     41458.21263896366,
//     45539.79080632466,
//     47733.88867176758,
//     70206.89573091133,
//     79675.18132670697,
//     79675.18132670697,
//     79675.18132670697,
//     79675.18132670697,
//     79675.18132670697,
//     55602.802134524376,
//     60006.93256066665,
//     79675.18132670697,
//     79675.18132670697,
//     79675.18132670697,
//     69544.20926133085,
//     59085.10074458689,
//     45320.957936967,
//     59548.05158312702,
//     67397.50709694265,
//     62073.05281649706,
//     58410.17690438208,
//     65266.748701483935,
//     61604.98083262395,
//     16846.2427712766 ],
