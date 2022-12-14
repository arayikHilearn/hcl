import { FC } from 'react';
import styles from 'src/styles/components/Widget.module.scss';
import { HomeIcon } from './icons';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import { TRootState } from '../store';
import { useAppSelector } from '../hooks/redux';
import numberToShortForm from '../utils/numberToShortForm';
import { CURRENCY } from '../config';

export interface IWidgetProps {
    type?: 'default' | 'monotone';
    background?: string;
    label: string;
    selector: (state: TRootState) => unknown;
    title: string;
    subTitle: string;
}

const Widget: FC<IWidgetProps> = ({
    type = 'default',
    background = 'none',
    label,
    title,
    subTitle,
    selector
}) => {
    const price = CURRENCY + numberToShortForm(useAppSelector(selector) as (number | null) || 0);

    useRenderWatcher('Widget', [ type, price ]);
    return (
        <div
            className={ `light-c ${styles.widget}` }
            style={{ backgroundColor: background }}
        >
            <span className={ styles.label }>{ label }</span>
            <span className={ styles.price }>{ price }</span>
            <HomeIcon type={ type } />
            <h4 className={ styles.title }>{ title }</h4>
            <span className={ styles.subtitle }>{ subTitle }</span>
        </div>
    );
};

export default Widget;
