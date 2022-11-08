import { FC, ReactNode } from 'react';
import styles from 'src/styles/UI/AppHeader.module.scss';

interface IAppSectionProps {
    children: ReactNode
}

const AppSection: FC<IAppSectionProps> = ({ children }) => {
    return (
        <section className={ styles.section }>
            <div className="container">
                { children }
            </div>
        </section>
    );
};

export default AppSection;
