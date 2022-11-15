import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRootState } from '../../index';
import { ICalculateForm } from './index';
import { apiErrorMessage, emptyErrorMessage } from '../../../config';
import isValid, {
    cashAvailableErrorConfig,
    homePriceErrorConfig,
    setInterestErrorConfig
} from '../../../utils/isValid';
import ApiService from '../../../services/ApiService';
import { chartsDataActionCreators } from '../chartsData/slice';
import { getChartsData } from '../../utils/getChartsData';

export const calculate = createAsyncThunk(
    'calculateForm/submit',
    async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
        console.log('calculateForm/submit');
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


            //console.log(88777, 879, error, { loanProgram, cashAvailable, homePrice, interestRate });


            if (Object.keys(error).length) {
                return rejectWithValue(error);
            }


            const data = await ApiService.calculate({
                property_value: homePrice as number,
                downpayment: cashAvailable as number,
                interest_rate: interestRate as number,
                term: loanProgram as number,
            });

            dispatch(chartsDataActionCreators.setChartsData(getChartsData(data)));

            return null;
        } catch (err) {
            return rejectWithValue({ api: apiErrorMessage });
        }

    }
);
