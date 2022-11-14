import { FC, FormEvent, useMemo } from 'react';
import { useActions, useAppSelector } from '../hooks/redux';
import AppInput from './UI/AppInput';
import styles from  'src/styles/components/CalculateForm.module.scss';
import getMaskOptions from '../utils/getMaskOptions';
import { loanProgramMap } from '../store/reducers/calculateForm';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppButton from './UI/AppButton';
import { CURRENCY } from '../config';
import CalculateFormSelector from '../store/selectors/CalculateFormSelector';

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
    const loanProgram = useAppSelector(CalculateFormSelector.loanProgramSelector);

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
                selector={ CalculateFormSelector.homePriceSelector }
                errorSelector={ CalculateFormSelector.errorSelector('homePrice') }
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
                    selector={ CalculateFormSelector.cashAvailableSelector }
                    errorSelector={ CalculateFormSelector.errorSelector('cashAvailable') }
                    onChangeHandler={ setCashAvailable }
                    mask={ priceMaskOptions }
                />
                <AppInput
                    type="circle"
                    name="cashAvailable"
                    selector={ CalculateFormSelector.cashAvailableSelectorPercent }
                    onChangeHandler={ setCashAvailableByPercent }
                    mask={ percentMaskOptions }
                />
            </div>
            <AppInput
                name="interestRate"
                label="Interest rate"
                selector={ CalculateFormSelector.interestRateSelector }
                errorSelector={ CalculateFormSelector.errorSelector('interestRate') }
                onChangeHandler={ setInterestRate }
                mask={ percentPrefixMaskOptions }
            />
            <AppButton
                errorSelector={ CalculateFormSelector.hasErrorSelector }
                type="submit"
            >
                Calculate
            </AppButton>
        </form>
    );
};

export default CalculateForm;
