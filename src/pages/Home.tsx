import { FC } from 'react';
import CalculateForm from '../components/CalculateForm';
import AppHeader from '../components/UI/AppHeader';
import styles from 'src/styles/pages/Home.module.scss';

const Home: FC = () => {
    // const [ modalVisible, setModalVisible ] = useState(false);
    // const { createEvent } = useActions();
    // const { guests, events } = useAppSelector(state => state.event);
    //
    // function createNewEvent(event: IEvent) {
    //     setModalVisible(false);
    //     createEvent(event);
    // }

    return (
        <AppHeader>
            <div className="container">
                <h1 className={ `light-c ${styles['title']}` }>Hybrid Collateral Loan (HCL)</h1>
                <h4 className={ `light-c ${styles['sub-title']}` }>Description text goes her for the hybrid collateral loan</h4>
                <CalculateForm />
            </div>
        </AppHeader>
    );
};

export default Home;
