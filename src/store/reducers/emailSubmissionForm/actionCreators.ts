import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import isValid, { setEmailErrorConfig } from '../../../utils/isValid';
import { IEmailSubmissionForm } from './index';
import ApiService from '../../../services/ApiService';
import { apiErrorMessage } from '../../../config';

export const emailSubmission = createAsyncThunk(
    'emailSubmissionForm/submit',
    async (_, { rejectWithValue, fulfillWithValue, getState }): Promise<any> => {
        console.log('emailSubmissionForm/submit');
        try {
            const state: TRootState = getState() as TRootState;
            const { emailSubmissionForm: { email }, calculateForm: { loanProgram, cashAvailable, homePrice, interestRate } } = state as TRootState;
            const error: IEmailSubmissionForm['error'] = {};

            const errorEmail = isValid(email?.toString() || '', setEmailErrorConfig);
            if (errorEmail) error.email = errorEmail;

            if (Object.keys(error).length) {
                return rejectWithValue(error);
            }

            const calculationsData = {
                property_value: homePrice,
                downpayment: cashAvailable,
                interest_rate: interestRate,
                term: loanProgram
            };

            const isSucceed: boolean = await ApiService.emailSubscribe({ email: email as string, calculationsData });

            return fulfillWithValue(isSucceed);
        } catch (err) {
            return rejectWithValue({ api: apiErrorMessage });
        }

    }
);
