import { FC } from 'react';
import CalculateForm from '../components/CalculateForm';
import AppHeader from '../components/UI/AppHeader';
import styles from 'src/styles/pages/Home.module.scss';
import Widget from '../components/Widget';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppSection from '../components/UI/AppSection';
import ColumnChart from '../components/Charts/ColumnChart';
import LineChart from '../components/Charts/LineChart';
import _c from 'classnames';
import { useAppSelector } from '../hooks/redux';
import chartsSelector from '../store/selectors/ChartsSelector';
import AppSectionTitle from '../components/UI/AppSectionTitle';
import CalculateFormSelector from '../store/selectors/CalculateFormSelector';
import EmailSubmissionForm from '../components/EmailSubmissionForm';

const Home: FC = () => {
    const chartsCategories = useAppSelector(chartsSelector.GetChartsCategories);

    useRenderWatcher('Home');
    return (
        <>
            <AppHeader>
                <div className="container">
                    <div className={ _c('row-sb', styles['header-inner']) }>
                        <div className={ `column ${styles['col-1']}` }>
                            <h1 className={ `light-c ${styles['title']}` }>Hybrid Collateral Loan (HCL)</h1>
                            <h3 className={ `light-c ${styles['sub-title']}` }>Description text goes her for the hybrid collateral loan</h3>
                            <CalculateForm />
                        </div>
                        <div className={ `row-sb ${styles['col-2']}` }>
                            <Widget
                                type="monotone"
                                label="Principal"
                                selector={ CalculateFormSelector.cashAvailableSelector }
                                title="Conventional"
                                subTitle="20% down payment"
                            />
                            <Widget
                                type="default"
                                background="rgba(231, 252, 185, 0.1)"
                                label="Principal"
                                selector={ CalculateFormSelector.homePriceSelector }
                                title="HCL"
                                subTitle="20% investment"
                            />
                        </div>
                    </div>
                </div>
            </AppHeader>

            <EmailSubmissionForm />

            { chartsCategories.map((cat, i) => (
                <AppSection key={ cat }>
                    <div className="row-sb">
                        <AppSectionTitle number={ `0${i+1}` }>
                            { `${cat.replace(/\b[a-z]/g, (l) => l.toUpperCase())} scenario` }
                        </AppSectionTitle>
                    </div>
                    <div className="row-sb">
                        <ColumnChart category={ cat } />
                        <LineChart category={ cat } />
                    </div>
                </AppSection>
            )) }

        </>
    );
};

export default Home;
