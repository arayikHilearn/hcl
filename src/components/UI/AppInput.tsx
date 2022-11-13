import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react';
import styles from '../../styles/UI/AppInput.module.scss';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import { useAppSelector } from '../../hooks/redux';
import _c from 'classnames';
import { calculateForm } from '../../store/selectors';
import { TCalculateFormData } from '../../store/reducers/calculateForm';
import parseToFloat from '../../utils/parseToFloat';
import { TRootState } from '../../store';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof TCalculateFormData
    label?: string;
    inputValue?: InputProps['value'];
    selector?: (state: TRootState) => unknown;
    onChangeHandler?: (value: number | null) => void;
    mask?: MaskedInputProps;
}

const AppInput: FC<InputProps> = ({
    name,
    label,
    onChangeHandler,
    inputValue,
    selector,
    mask,
    ...defaultProps
}) => {
    const error = useAppSelector(calculateForm.errorSelector(name));
    const value = inputValue ? inputValue : selector ? useAppSelector(selector) : '';
    let inputProps = {
        ...defaultProps,
        className: styles.input,
        value,
    } as MaskedInputProps;
    if (mask) {
        inputProps = { ...inputProps, ...mask };
    }
    if (onChangeHandler) {
        inputProps = {
            ...inputProps,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
                onChangeHandler(parseToFloat(event.target.value));
            }
        };
    }

    useRenderWatcher('AppInput', [ name, value, error ]);
    return (
        <label className={ _c(
            styles['input-wrapper'], {
                [styles['disabled']]: inputProps.disabled
            }) }
        >
            <span className={ _c(
                'dark-op-c',
                styles['input-label'], {
                    [styles['empty']]: value === null
                }) }
            >
                { label }
            </span>
            <div className={ styles['input-area'] }>
                {
                    mask
                        ? <MaskedInput { ...inputProps } />
                        : <input { ...inputProps } />
                }
            </div>
            <span className={ styles['input-error'] }>{ error }
            </span>
        </label>
    );
};

export default memo(AppInput);
