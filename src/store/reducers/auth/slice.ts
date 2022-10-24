import { IUser } from 'src/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './actionCreators';
import { IAuthState } from './index';

const initialState: IAuthState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: ''
}; 

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setUser( state, { payload }: PayloadAction<IUser> ) {
            state.user = payload;
        },
        setIsAuth( state, { payload }: PayloadAction<boolean> ) {
            state.isAuth = payload;
        }
    },
    extraReducers: {
        [login.fulfilled.type]: ( state, { payload }: PayloadAction<IUser> ) => {
            console.log( payload );
            state.user = payload;
            state.isAuth = true;
            state.isLoading = false;
            state.error = '';
        },
        [login.pending.type]: ( state ) => {
            state.isLoading = false;
        },
        [login.rejected.type]: ( state, { payload }: PayloadAction<string> ) => {
            state.isLoading = false;
            state.error = payload;
        },
        [logout.fulfilled.type]: ( state ) => {
            state.user = null;
            state.isAuth = false;
        }
    }
} );

export const authActionsCreators = {
    ...authSlice.actions,
    login,
    logout
};
export default authSlice.reducer;