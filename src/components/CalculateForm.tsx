import { FC, FormEvent, useMemo } from 'react';
import { useActions, useAppSelector } from '../hooks/redux';
import { calculateForm } from '../store/selectors';
import AppInput from './UI/AppInput';
import styles from  'src/styles/components/CalculateForm.module.scss';
import getMaskOptions from '../utils/getMaskOptions';
import { loanProgramMap } from '../store/reducers/calculateForm';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppButton from './UI/AppButton';
import { CURRENCY } from '../config';

const CalculateForm: FC = () => {
    const actions = useActions();
    const {
        actions: {
            setHomePrice, setCashAvailable, setCashAvailableByPercent, setInterestRate, calculate
        }, priceMaskOptions, percentPrefixMaskOptions, percentMaskOptions
    } = useMemo(() => ({
        actions,
        priceMaskOptions: getMaskOptions(CURRENCY),
        percentPrefixMaskOptions: getMaskOptions('%', 'percent-prefix'),
        percentMaskOptions: getMaskOptions('%', 'percent')
    }), []);
    const loanProgram = useAppSelector(calculateForm.loanProgramSelector);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        calculate();
    }

    useRenderWatcher('CalculateForm');
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
            <div className={ styles['inputs-wrapper'] }>
                <AppInput
                    wrapperClassName={ styles['input-mixed'] }
                    name="cashAvailable"
                    label="Cash available for down payment"
                    selector={ calculateForm.cashAvailableSelector }
                    onChangeHandler={ setCashAvailable }
                    mask={ priceMaskOptions }
                />
                <AppInput
                    type="circle"
                    name="cashAvailable"
                    selector={ calculateForm.cashAvailableSelectorPercent }
                    onChangeHandler={ setCashAvailableByPercent }
                    mask={ percentMaskOptions }
                />
            </div>
            <AppInput
                name="interestRate"
                label="Interest rate"
                selector={ calculateForm.interestRateSelector }
                onChangeHandler={ setInterestRate }
                mask={ percentPrefixMaskOptions }
            />
            <AppButton type="submit">
                Calculate
            </AppButton>
        </form>
    );
};

export default CalculateForm;
