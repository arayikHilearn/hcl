import { FC, ReactNode } from 'react';
import styles from 'src/styles/UI/AppHeader.module.scss';

interface IAppHeaderProps {
    children: ReactNode
}

const AppHeader: FC<IAppHeaderProps> = ({ children }) => {
    return (
        <header className={ styles.header }>
            <div className={ styles['header-bg'] } />
            { children }
        </header>
    );
};

export default AppHeader;
