import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import { ICalculateForm } from './index';
import { emptyErrorMessage } from '../../../config';

export const calculate = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        try {
            const { calculateForm: { loanProgram, cashAvailable, homePrice, interestRate } } = getState() as TRootState;
            const error: ICalculateForm['error'] = {};
            if (!loanProgram) {
                error.loanProgram = emptyErrorMessage;
            }

            if (!cashAvailable) {
                error.cashAvailable = emptyErrorMessage;
            }

            if (!homePrice) {
                error.homePrice = emptyErrorMessage;
            }

            if (!interestRate) {
                error.interestRate = emptyErrorMessage;
            }

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
