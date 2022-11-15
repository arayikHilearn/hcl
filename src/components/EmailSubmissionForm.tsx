import { FC, FormEvent, useMemo } from 'react';
import { useActions } from '../hooks/redux';
import AppInput from './UI/AppInput';
import styles from  'src/styles/components/EmailSubmissionForm.module.scss';
import getMaskOptions from '../utils/getMaskOptions';
import { useRenderWatcher } from '../hooks/useRenderWatcher';
import AppButton from './UI/AppButton';
import { CURRENCY } from '../config';
import EmailSubmissionFormSelector from '../store/selectors/EmailSubmissionFormSelector';
import emailMask from 'text-mask-addons/dist/emailMask';


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
        <div className={ styles['form-wrapper'] }>
            <h4 className={ styles.title }>Subscribe for waiting list</h4>
            <form
                onSubmit={ onSubmit }
                className={ `row-sb ${styles.form}` }
            >
                <AppInput
                    wrapperClassName={ styles.input }
                    name="email"
                    label="Email"
                    selector={ EmailSubmissionFormSelector.emailSelector }
                    errorSelector={ EmailSubmissionFormSelector.errorSelector('email') }
                    onChangeHandler={ setEmail }
                    mask={ emailMask }
                />
                <AppButton
                    styleType="circle"
                    errorSelector={ EmailSubmissionFormSelector.hasErrorSelector }
                    type="submit"
                />
            </form>
        </div>
    );
};

export default EmailSubmissionForm;
