import { FC, FormEvent, useMemo } from 'react';
import { useActions, useAppSelector } from '../hooks/redux';
import { calculateForm } from '../store/selectors';
import AppInput from './UI/AppInput';
import styles from  'src/styles/components/CalculateForm.module.scss';
import getMaskOptions from '../utils/getMaskOptions';
import { loanProgramMap } from '../store/reducers/calculateForm';
import { useRenderWatcher } from '../hooks/useRenderWatcher';

const CalculateForm: FC = () => {
    useRenderWatcher('CalculateForm');

    const actions = useActions();
    const { actions: { setHomePrice, setCashAvailable, setInterestRate, calculate }, priceMaskOptions, percentMaskOptions } = useMemo(() => ({
        actions,
        priceMaskOptions: getMaskOptions('$'),
        percentMaskOptions: getMaskOptions('%', 'percent')
    }), []);
    const loanProgram = useAppSelector(calculateForm.loanProgramSelector);
    const hasError = useAppSelector(calculateForm.hasErrorSelector);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        calculate();
    }

    return (
        <form
            onSubmit={ onSubmit }
            className={ `row ${styles.form}` }
        >
            <AppInput
                name="homePrice"
                label="Home price"
                selector={ calculateForm.homePriceSelector }
                onChangeHandler={ setHomePrice }
                mask={ priceMaskOptions }
            />
            <AppInput
                name="loanProgram"
                disabled={ true }
                label="Loan program"
                inputValue={ loanProgram ? loanProgramMap.get(loanProgram) : '' }
            />
            <AppInput
                name="cashAvailable"
                label="Cash available for down payment"
                selector={ calculateForm.cashAvailableSelector }
                onChangeHandler={ setCashAvailable }
                mask={ priceMaskOptions }
            />
            <AppInput
                name="interestRate"
                label="Interest rate"
                selector={ calculateForm.interestRateSelector }
                onChangeHandler={ setInterestRate }
                mask={ percentMaskOptions }
            />
            <button
                type="submit"
                disabled={ hasError }
            >submit
            </button>
        </form>
    );
};

export default CalculateForm;
// import { FC, useState } from 'react';
// import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
// import { rules } from '../utils/rules';
// import { IUser } from '../models/user';
// import { IEvent } from '../models/event';
// import { Moment } from 'moment';
// import { formatDate } from '../utils/date';
// import { useAppSelector } from '../hooks/redux';
//
// interface IEventFormProps {
//     guests: IUser[]
//     submit: ( event: IEvent ) => void
// }
//
// const EventForm: FC<IEventFormProps> = ( { guests, submit } ) => {
//     const { user } = useAppSelector( state => state.auth );
//     const [ event, setEvent ] = useState<IEvent>( {
//         author: user?.username || '',
//         date: '',
//         description: '',
//         guest: ''
//     } );
//
//     function selectDate( date: Moment | null ) {
//         if ( date ) {
//             setEvent( { ...event, date: formatDate( date?.toDate() ) } );
//         }
//     }
//
//     function submitForm() {
//         submit( event );
//     }
//
//     return (
//         <Form onFinish={ submitForm }>
//             <Form.Item
//                 label="Description"
//                 name="description"
//                 rules={ [ rules.required() ] }
//             >
//                 <Input
//                     onChange={ e => setEvent( { ...event, description: e.target.value } ) }
//                     value={ event.description }
//                 />
//             </label>
//             <Form.Item
//                 label="Date"
//                 name="date"
//                 rules={ [ rules.required(), rules.isDateAfter( 'Do not create an event in the past' ) ] }
//             >
//                 <DatePicker onChange={ ( date ) => selectDate( date ) } />
//             </Form.Item>
//             <Form.Item
//                 label="Guest"
//                 name="guest"
//                 rules={ [ rules.required() ] }
//             >
//                 <Select onChange={ ( guest: string ) => setEvent( { ...event, guest } ) }>
//                     { guests.map( guest => (
//                         <Select.Option
//                             value={ guest.username }
//                             key={ guest.username }
//                         >
//                             { guest.username }
//                         </Select.Option>
//                     ) ) }
//                 </Select>
//             </Form.Item>
//             <Row justify="end">
//                 <Form.Item>
//                     <Button
//                         type="primary"
//                         htmlType="submit"
//                     >
//                         Add
//                     </Button>
//                 </Form.Item>
//             </Row>
//         </Form>
//     );
// };
//
// export default EventForm;
export {};
