import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import isValid, { setEmailErrorConfig } from '../../../utils/isValid';
import { ICalculateForm } from '../calculateForm';
import { IEmailSubmissionForm } from './index';

export const emailSubmission = createAsyncThunk(
    'emailSubmissionForm/submit',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        console.log('emailSubmissionForm/submit');
        try {
            const { emailSubmissionForm: { email } } = getState() as TRootState;
            const error: IEmailSubmissionForm['error'] = {};

            const errorEmail = isValid(email?.toString() || '', setEmailErrorConfig);
            if (errorEmail) error.email = errorEmail;

            if (Object.keys(error).length) {
                return rejectWithValue(error);
            }


            console.log(email, 1213);
            fulfillWithValue(true);

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
            console.log(err);
            //return rejectWithValue('Something went wrong!');
        }

    }
);
