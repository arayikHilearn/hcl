import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculate } from './actionCreators';
import { ICalculateForm } from './index';
import { emptyErrorMessage } from '../../../config';

const initialState: ICalculateForm = {
    homePrice: null,
    loanProgram: 30,
    cashAvailable: null,
    interestRate: null,
    error: {}
};

const calculateFormSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setHomePrice(state, { payload }: PayloadAction<ICalculateForm['homePrice']>) {
            state.homePrice = payload;
            if (payload) delete state.error.homePrice;
            else state.error.homePrice = emptyErrorMessage;
        },
        setCashAvailable(state, { payload }: PayloadAction<ICalculateForm['cashAvailable']>) {
            state.cashAvailable = payload;
            if (payload) delete state.error.cashAvailable;
            else state.error.cashAvailable = emptyErrorMessage;
        },
        setInterestRate(state, { payload }: PayloadAction<ICalculateForm['interestRate']>) {
            state.interestRate = payload;
            if (payload) delete state.error.interestRate;
            else state.error.interestRate = emptyErrorMessage;
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

export default calculateFormSlice.reducer;
