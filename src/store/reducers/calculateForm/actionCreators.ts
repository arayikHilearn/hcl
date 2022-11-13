import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import { ICalculateForm } from './index';
import { emptyErrorMessage } from '../../../config';
import isValid, {
    cashAvailableErrorConfig,
    homePriceErrorConfig,
    setInterestErrorConfig
} from '../../../utils/isValid';

export const calculate = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        try {
            const { calculateForm: { loanProgram, cashAvailable, homePrice, interestRate } } = getState() as TRootState;
            const error: ICalculateForm['error'] = {};

            if (!loanProgram) error.loanProgram = emptyErrorMessage;

            const homePriceError = isValid(homePrice?.toString() || '', homePriceErrorConfig);
            if (homePriceError) (error.homePrice = homePriceError);

            const cashAvailableError = isValid(cashAvailable?.toString() || '', cashAvailableErrorConfig(homePrice || 0));
            if (cashAvailableError) (error.cashAvailable = cashAvailableError);


            const interestRateError = isValid(interestRate?.toString() || '', setInterestErrorConfig);
            if (interestRateError) (error.interestRate = interestRateError);


            if (Object.keys(error).length) {
                return rejectWithValue(error);
            }

            console.log({ loanProgram, cashAvailable, homePrice, interestRate }, 'BODY');
        } catch (err) {
            console.log(err);
            return rejectWithValue('Something went wrong!');
        }

    }
);
