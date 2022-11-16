import { FC, useEffect, useState } from 'react';
import { TRootState } from '../store';
import { useActions, useAppSelector } from '../hooks/redux';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import styles from 'src/styles/components/StatusPopup.module.scss';
import _c from 'classnames';
import { CheckIcon } from './icons';


interface IStatusPopupProps {
    timer: number;
    showSelector: (state: TRootState) => boolean;
}

const StatusPopup: FC<IStatusPopupProps> = ({ showSelector, timer }) => {
    const show = useAppSelector(showSelector);
    const [ hide, setHide ] = useState(false);
    const { cleanIsSucceed } = useActions();

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setHide(true);
                setTimeout(() => {
                    setHide(false);
                    cleanIsSucceed();
                }, 690);
            }, timer);
        }
    }, [ show ]);

    useRenderWatcher('StatusPopup');

    if (show) {
        return (
            <div className={ _c(styles['status-popup'], { [styles.hide]: hide }) }>
                <div className={ styles.popup }>
                    <div className={ styles['check-icon'] }>
                        <CheckIcon />
                    </div>
                    <div className={ styles.info }>
                        <h4 className={ styles.title }>Thanks, your subscription has been confirmed.</h4>
                        <span className={ styles.subtitle }>{ 'You\'ve been added to our list and will hear from us soon.' }</span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={ _c(styles['status-popup'], styles.empty) } />
        );
    }

};

export default StatusPopup;
