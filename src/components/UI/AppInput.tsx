import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react';
import styles from '../../styles/UI/AppInput.module.scss';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { useRenderWatcher } from '../../hooks/useRenderWatcher';
import { useAppSelector } from '../../hooks/redux';
import _c from 'classnames';
import { TCalculateFormData } from '../../store/reducers/calculateForm';
import parseToFloat from '../../utils/parseToFloat';
import { TRootState } from '../../store';
import { TEmailSubmissionFormData } from '../../store/reducers/emailSubmissionForm';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof TCalculateFormData | keyof TEmailSubmissionFormData
    label?: string;
    inputValue?: InputProps['value'];
    selector?: (state: TRootState) => unknown;
    errorSelector?: (state: TRootState) => string;
    onChangeHandler?: (value: any) => void;
    mask?: MaskedInputProps;
    type?: 'default' | 'circle';
    wrapperClassName?: string;
}

const AppInput: FC<InputProps> = ({
    name,
    label,
    onChangeHandler,
    inputValue,
    selector,
    errorSelector,
    mask,
    type,
    className,
    wrapperClassName,
    ...defaultProps
}) => {
    const error = errorSelector ? useAppSelector(errorSelector) : '';
    const value = inputValue ? inputValue : selector ? useAppSelector(selector) : '';
    let inputProps = {
        ...defaultProps,
        value,
        className: _c(styles.input, className, {
            [styles['input-circle']]: type === 'circle'
        }),
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

    console.log(inputProps);
    useRenderWatcher('AppInput', [ name, value, error ]);

    if (type === 'circle') {
        return (
            mask
                ? <MaskedInput { ...inputProps } />
                : <input { ...inputProps } />
        );
    }

    return (
        <label className={ _c(
            styles['input-wrapper'], wrapperClassName || '', {
                [styles['disabled']]: inputProps.disabled,
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
            <span className={ styles['input-error'] }>
                { error }
            </span>
        </label>
    );
};

export default memo(AppInput);
