import { FC } from 'react';
import styles from 'src/styles/components/ColumnChartLables.module.scss';
import _c from 'classnames';

interface IColumnChartLabels {
    width: number;
    padding: number;
    title: string;
    dataLabels: [
        Array<{
            text: string;
            colorIndex: number;
            type: 'circle' | 'line' | 'dash'
        }>,
        Array<{
            text: string;
            colorIndex: number;
            type: 'circle' | 'line' | 'dash'
        }>
    ]
}

const ChartLabels: FC<IColumnChartLabels> = ({ width, padding, title, dataLabels: [ dataLabels1, dataLabels2 ] }) => {

    return (
        <div
            className={ styles['data-labels-wrapper'] }
            style={{ width, paddingRight: `${padding}px`, paddingLeft: `${padding}px` }}
        >
            <h3 className={ styles['title'] }>{ title }</h3>
            <div className={ styles['data-labels'] }>
                <div className={ styles['data-labels-col1'] }>
                    { dataLabels1.map((dataLabel, index) => (
                        <span
                            key={ index }
                            className={ _c(styles[`data-label-${dataLabel.type}`], styles[`data-label${dataLabel.colorIndex}`]) }
                        >
                            { dataLabel.text }
                        </span>
                    )) }
                </div>
                <div className={ styles['data-labels-col2'] }>
                    { dataLabels2.map((dataLabel, index) => (
                        <span
                            key={ index }
                            className={ _c(styles[`data-label-${dataLabel.type}`], styles[`data-label${dataLabel.colorIndex}`]) }
                        >
                            { dataLabel.text }
                        </span>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default ChartLabels;
