import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from 'src/styles/UI/AppButton.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import { ArrowRight } from '../icons';
import { TRootState } from '../../store';

interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
    children: ReactNode,
    errorSelector?: (state: TRootState) => unknown;
}

const AppButton: FC<IAppButtonProps> = ({ children, errorSelector, ...defaultProps }) => {
    const hasError = errorSelector ? !!useAppSelector(errorSelector) : false;

    useRenderWatcher('AppButton');
    return (
        <button
            { ...defaultProps }
            disabled={ hasError }
            className={ styles.button }
        >
            { children }
            <ArrowRight className={ styles.icon } />
        </button>
    );
};

export default AppButton;
