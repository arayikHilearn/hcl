import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import isValid, { setEmailErrorConfig } from '../../../utils/isValid';
import { ICalculateForm } from '../calculateForm';
import { IEmailSubmissionForm } from './index';
import ApiService from '../../../services/ApiService';
import { apiErrorMessage } from '../../../config';

export const emailSubmission = createAsyncThunk(
    'emailSubmissionForm/submit',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        console.log('emailSubmissionForm/submit');
        try {
            const { emailSubmissionForm: { email }, calculateForm: { loanProgram, cashAvailable, homePrice, interestRate } } = getState() as TRootState;
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
            const isSucceed = await ApiService.emailSubscribe({ email: email as string, calculationsData });
            console.log(email, isSucceed, 1213);
            fulfillWithValue(isSucceed);

            // if (Object.keys(error).length) {
            //     return rejectWithValue(error);
            // }

            // const data = await ApiService.calculate({
            //     property_value: homePrice as number,
            //     downpayment: cashAvailable as number,
            //     interest_rate: interestRate as number,
            //     term: loanProgram as number,
            // });
            //
            // dispatch(chartsDataActionCreators.setChartsData(getChartsData(data)));
            //
            // return null;
        } catch (err) {
            return rejectWithValue({ api: apiErrorMessage });
        }

    }
);
