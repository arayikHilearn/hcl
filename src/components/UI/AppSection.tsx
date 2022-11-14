import { FC, ReactNode } from 'react';

interface IAppSectionProps {
    children: ReactNode
}

const AppSection: FC<IAppSectionProps> = ({ children }) => {
    return (
        <section>
            <div className="container">
                { children }
            </div>
        </section>
    );
};

export default AppSection;
