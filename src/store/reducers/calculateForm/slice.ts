import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculate } from './actionCreators';
import { ICalculateForm } from './index';
import isValid, {
    cashAvailableErrorConfig,
    homePriceErrorConfig,
    setInterestErrorConfig
} from '../../../utils/isValid';

const initialState: ICalculateForm = {
    homePrice: null,
    loanProgram: 30,
    cashAvailable: null,
    interestRate: null,
    error: {}
};

const calculateFormSlice = createSlice({
    name: 'calculateForm',
    initialState,
    reducers: {
        setHomePrice(state, { payload }: PayloadAction<ICalculateForm['homePrice']>) {
            state.homePrice = payload;

            const errorHomePrice = isValid(payload?.toString() || '', homePriceErrorConfig);
            errorHomePrice ? (state.error.homePrice = errorHomePrice) : (delete state.error.homePrice);
            const errorCashAvailable = isValid(state.cashAvailable?.toString() || '', cashAvailableErrorConfig(payload || 0));
            errorCashAvailable ? (state.error.cashAvailable = errorCashAvailable) : (delete state.error.cashAvailable);

        },
        setCashAvailable(state, { payload }: PayloadAction<ICalculateForm['cashAvailable']>) {
            state.cashAvailable = payload;

            const error = isValid(payload?.toString() || '', cashAvailableErrorConfig(state.homePrice || 0));
            error ? (state.error.cashAvailable = error) : (delete state.error.cashAvailable);
        },
        setCashAvailableByPercent(state, { payload }: PayloadAction<number | null>) {
            const cashAvailable = (state.homePrice || 0) * (payload || 0) / 100;
            state.cashAvailable = cashAvailable;

            const error = isValid(cashAvailable.toString(), cashAvailableErrorConfig(state.homePrice || 0));
            error ? (state.error.cashAvailable = error) : (delete state.error.cashAvailable);
        },
        setInterestRate(state, { payload }: PayloadAction<ICalculateForm['interestRate']>) {
            state.interestRate = payload;

            const error = isValid(payload?.toString() || '', setInterestErrorConfig);
            error ? (state.error.interestRate = error) : (delete state.error.interestRate);
        },
        setError(state, { payload }: PayloadAction<ICalculateForm['error']>) {
            state.error = { ...state.error, ...payload };
        },

    },
    extraReducers: {
        // [calculate.fulfilled.type]: (state, { payload }: PayloadAction<any>) => {
        //
        // },
        // [calculate.pending.type]: (state) => {
        //
        // },
        [calculate.rejected.type]: (state, { payload }: PayloadAction<ICalculateForm['error']>) => {
            state.error = payload;
        },
    }
});

export const calculateFormActionCreators = {
    ...calculateFormSlice.actions,
    calculate,
};

export default {
    name: calculateFormSlice.name,
    reducer: calculateFormSlice.reducer,
};
