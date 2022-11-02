import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from 'src/styles/UI/AppButton.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { calculateForm } from '../../store/selectors';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import { ArrowRight } from '../icons';

interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
    children: ReactNode
}

const AppButton: FC<IAppButtonProps> = ({ children, ...defaultProps }) => {
    const hasError = useAppSelector(calculateForm.hasErrorSelector);

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
