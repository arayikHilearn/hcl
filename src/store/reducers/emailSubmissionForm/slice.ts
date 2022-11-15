import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emailSubmission } from './actionCreators';
import { IEmailSubmissionForm } from './index';
import isValid, { homePriceErrorConfig, setEmailErrorConfig } from '../../../utils/isValid';

const initialState: IEmailSubmissionForm = {
    subStatus: false,
    email: null,
    error: {}
};

const emailSubmissionFormSlice = createSlice({
    name: 'emailSubmissionForm',
    initialState,
    reducers: {
        setEmail(state, { payload }: PayloadAction<IEmailSubmissionForm['email']>) {
            state.email = payload;

            const errorEmail = isValid(payload?.toString() || '', setEmailErrorConfig);
            errorEmail ? (state.error.email = errorEmail) : (delete state.error.email);
        },

    },
    extraReducers: {
        [emailSubmission.fulfilled.type]: (state, { payload }: PayloadAction<boolean>) => {
            state.subStatus = payload;

            console.log(payload);
        },
        // [emailSubmission.pending.type]: (state) => {
        //
        // },
        [emailSubmission.rejected.type]: (state, { payload }: PayloadAction<IEmailSubmissionForm['error']>) => {
            state.error = payload;
        },
    }
});

export const emailSubmissionFormActionCreators = {
    ...emailSubmissionFormSlice.actions,
    emailSubmission,
};

export default {
    name: emailSubmissionFormSlice.name,
    reducer: emailSubmissionFormSlice.reducer,
};
