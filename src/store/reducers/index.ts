import calculateForm, { calculateFormActionCreators } from './calculateForm/slice';
import emailSubmissionForm, { emailSubmissionFormActionCreators } from './emailSubmissionForm/slice';
import chartsData, { chartsDataActionCreators } from './chartsData/slice';
import postAPI from '../../services/postSevice';
import { createReducer } from '@reduxjs/toolkit';
import stateSetUp from '../../config/StateSetUp';

const appReducer = createReducer({ isAppReady: false }, (builder) => {
    builder
        .addCase(stateSetUp.setUp.fulfilled, (state, { payload: isAppReady }) => {
            state.isAppReady = Boolean(isAppReady);
        });
});

const reducers = {
    app: appReducer,
    [calculateForm.name]: calculateForm.reducer,
    [emailSubmissionForm.name]: emailSubmissionForm.reducer,
    [chartsData.name]: chartsData.reducer,
    [postAPI.reducerPath]: postAPI.reducer
};

export const actionCreators = {
    stateSetUp: stateSetUp.setUp,
    ...calculateFormActionCreators,
    ...emailSubmissionFormActionCreators,
    ...chartsDataActionCreators,
};

export default reducers;
