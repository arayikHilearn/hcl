import { FC, FormEvent, useMemo } from 'react';
import { useActions } from '../hooks/redux';
import AppInput from './UI/AppInput';
import styles from  'src/styles/components/CalculateForm.module.scss';
import getMaskOptions from '../utils/getMaskOptions';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppButton from './UI/AppButton';
import { CURRENCY } from '../config';
import EmailSubmissionFormSelector from '../store/selectors/EmailSubmissionFormSelector';

const EmailSubmissionForm: FC = () => {
    const actions = useActions();
    const {
        actions: { setEmail, emailSubmission },
        priceMaskOptions, percentPrefixMaskOptions, percentMaskOptions
    } = useMemo(() => ({
        actions,
        priceMaskOptions: getMaskOptions(CURRENCY),
        percentPrefixMaskOptions: getMaskOptions('%', 'percent-prefix'),
        percentMaskOptions: getMaskOptions('%', 'percent')
    }), []);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        emailSubmission();
    }

    useRenderWatcher('EmailSubmissionForm');
    return (
        <form
            onSubmit={ onSubmit }
            className={ `row ${styles.form}` }
        >
            <AppInput
                name="email"
                label="Email"
                selector={ EmailSubmissionFormSelector.emailSelector }
                onChangeHandler={ setEmail }
                //mask={ priceMaskOptions }
            />
            <AppButton
                errorSelector={ EmailSubmissionFormSelector.hasErrorSelector }
                type="submit"
            >
                Calculate
            </AppButton>
        </form>
    );
};

export default EmailSubmissionForm;
