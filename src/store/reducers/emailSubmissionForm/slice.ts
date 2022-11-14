import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emailSubmission } from './actionCreators';
import { IEmailSubmissionForm } from './index';

const initialState: IEmailSubmissionForm = {
    email: null,
    error: {}
};

const emailSubmissionFormSlice = createSlice({
    name: 'emailSubmissionForm',
    initialState,
    reducers: {
        setEmail(state, { payload }: PayloadAction<IEmailSubmissionForm['email']>) {
            state.email = payload;
        },

    },
    extraReducers: {
        // [emailSubmission.fulfilled.type]: (state, { payload }: PayloadAction<any>) => {
        //
        // },
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
