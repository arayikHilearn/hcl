import { FC, ReactNode } from 'react';
import styles from 'src/styles/UI/AppSectionTitle.module.scss';

interface IAppSectionTitleProps {
    children: ReactNode
    number?: string
}

const AppSectionTitle: FC<IAppSectionTitleProps> = ({ children, number }) => {
    return (
        <div className={ styles['title-wrapper'] }>
            { number ? <span className={ styles['title-number'] }>{ number }</span> :null }
            <h2 className={ styles.title }>{ children }</h2>
        </div>
    );
};

export default AppSectionTitle;
