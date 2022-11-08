import { FC } from 'react';
import CalculateForm from '../components/CalculateForm';
import AppHeader from '../components/UI/AppHeader';
import styles from 'src/styles/pages/Home.module.scss';
import Widget from '../components/Widget';
import { calculateForm } from '../store/selectors';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppSection from '../components/UI/AppSection';
import ColumnChart from '../components/Charts/ColumnChart';

const Home: FC = () => {
    useRenderWatcher('Home');
    return (
        <>
            <AppHeader>
                <div className="container">
                    <div className="row-sb">
                        <div className={ `column ${styles['col-1']}` }>
                            <h1 className={ `light-c ${styles['title']}` }>Hybrid Collateral Loan (HCL)</h1>
                            <h3 className={ `light-c ${styles['sub-title']}` }>Description text goes her for the hybrid collateral loan</h3>
                            <CalculateForm />
                        </div>
                        <div className={ `row-sb ${styles['col-2']}` }>
                            <Widget
                                type="monotone"
                                background="red"
                                label="Principal"
                                selector={ calculateForm.cashAvailableSelector }
                                title="Conventional"
                                subTitle="20% down payment"
                            />
                            <Widget
                                type="default"
                                background="rgba(231, 252, 185, 0.1)"
                                label="Principal"
                                selector={ calculateForm.homePriceSelector }
                                title="HCL"
                                subTitle="20% investment"
                            />
                        </div>
                    </div>
                </div>
            </AppHeader>
            <AppSection>
                <div className="row-sb">
                    <ColumnChart />
                    <ColumnChart />
                </div>
            </AppSection>
        </>
    );
};

export default Home;
