import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';

export const emailSubmission = createAsyncThunk(
    'emailSubmissionForm/submit',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        console.log('emailSubmissionForm/submit');
        try {
            const { emailSubmissionForm: { email } } = getState() as TRootState;

            console.log(email, 1213);
            fulfillWithValue(true);


            // if (!loanProgram) error.loanProgram = emptyErrorMessage;
            //
            // const homePriceError = isValid(homePrice?.toString() || '', homePriceErrorConfig);
            // if (homePriceError) (error.homePrice = homePriceError);
            //
            // const cashAvailableError = isValid(cashAvailable?.toString() || '', cashAvailableErrorConfig(homePrice || 0));
            // if (cashAvailableError) (error.cashAvailable = cashAvailableError);
            //
            // const interestRateError = isValid(interestRate?.toString() || '', setInterestErrorConfig);
            // if (interestRateError) (error.interestRate = interestRateError);
            //
            //
            // console.log(88777, 879, error, { loanProgram, cashAvailable, homePrice, interestRate });
            //
            //
            // if (Object.keys(error).length) {
            //     return rejectWithValue(error);
            // }
            //
            // console.log('calculateForm/submit', {
            //     property_value: homePrice as number,
            //     downpayment: cashAvailable as number,
            //     interest_rate: interestRate as number,
            //     term: loanProgram as number,
            // });
            //
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
            return rejectWithValue('Something went wrong!');
        }

    }
);
