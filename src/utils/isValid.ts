import { emailErrorMessage, emptyErrorMessage, inRangeErrorMessage, minLengthErrorMessage } from '../config';

interface IIsValidOptions {
    inRange?: {
        type?: 'normal',
        value: [number, number]
    } | {
        type: 'percent'
        compareValue: number,
        compareFiledName: string,
        value: [number, number],
        message: string
    },
    minLength?: {
        value: number,
        message: string
    },
    empty?: boolean
    isEmail?: boolean
}

export default function isValid(
    value: string,
    {
        isEmail,
        minLength,
        empty,
        inRange
    }: IIsValidOptions
) {
    let error: string | null = null;

    if (value) {
        if (isEmail) {
            const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail = emailRegExp.test(value);
            if (!isValidEmail) error = emailErrorMessage;
        }

        if (minLength && value.length < minLength?.value) {
            error = minLengthErrorMessage('1000$');
        }

        if (inRange) {
            if (inRange.type === 'percent') {
                const minValue = inRange.compareValue * inRange.value[0] / 100;
                const maxValue = inRange.compareValue * inRange.value[1] / 100;

                if (+value < minValue || +value > maxValue) {
                    error = inRangeErrorMessage(`${inRange.value.join(' to ')}% of ${inRange.compareFiledName}`);
                }
            } else {
                const minValue = inRange.value[0];
                const maxValue = inRange.value[1];

                if (+value < minValue || +value > maxValue) {
                    error = inRangeErrorMessage(`${inRange.value.join(' to ')}%`);
                }
            }
        }

    } else {
        if (empty) error = emptyErrorMessage;
    }

    return error;
}

export const homePriceErrorConfig = {
    empty: true,
    minLength: { value: 4, message: '1000$' }
};

export const cashAvailableErrorConfig = (compareValue: number) => ({
    empty: true,
    inRange: {
        type: 'percent',
        compareValue,
        compareFiledName: 'Home price',
        value: [ 5, 50 ]
    }
} as IIsValidOptions);

export const setInterestErrorConfig = {
    empty: true,
    inRange: {
        value: [ 1, 20 ]
    }
} as IIsValidOptions;

export const setEmailErrorConfig = {
    empty: true,
    isEmail: true
} as IIsValidOptions;
