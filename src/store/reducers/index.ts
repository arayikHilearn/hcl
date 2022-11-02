import authReducer, { authActionsCreators } from './auth/slice';
import eventReducer, { eventActionsCreators } from './event/slice';
import calculateFormReducer, { calculateFormActionCreators } from './calculateForm/slice';
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
    calculateForm: calculateFormReducer,
    auth: authReducer,
    event: eventReducer,
    [postAPI.reducerPath]: postAPI.reducer
};

export const actionCreators = {
    stateSetUp: stateSetUp.setUp,
    ...calculateFormActionCreators,
    ...authActionsCreators,
    ...eventActionsCreators,
};

export default reducers;
