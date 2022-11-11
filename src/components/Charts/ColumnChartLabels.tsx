import { FC } from 'react';
import styles from 'src/styles/components/ColumnChartLables.module.scss';
import _c from 'classnames';

interface IColumnChartLabels {
    width: number;
    padding: number;
    title: string;
    dataLabels: Array<{
        text: string;
        colorIndex: number;
    }>
}

const ColumnChartLabels: FC<IColumnChartLabels> = ({ width, padding, title, dataLabels }) => {

    return (
        <div
            className={ styles['data-labels-wrapper'] }
            style={{ width, paddingRight: `${padding}px`, paddingLeft: `${padding}px` }}
        >
            <h3 className={ styles['title'] }>{ title }</h3>
            <div className={ styles['data-labels'] }>
                { dataLabels.map((dataLabel, index) => (
                    <span
                        key={ index }
                        className={ _c(styles['data-label'], styles[`data-label${dataLabel.colorIndex}`]) }
                    >
                        { dataLabel.text }
                    </span>
                )) }
            </div>
        </div>
    );
};

export default ColumnChartLabels;
