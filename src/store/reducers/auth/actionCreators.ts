import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../../services/userService';
import { TUserLogin } from './index';
 
export const login = createAsyncThunk(
    'auth/login',
    async ( { username, password }: TUserLogin, { rejectWithValue, fulfillWithValue } ) => {
        try {
            const mockUser = await userService.login( username, password );
            console.log( 'login' );

            if ( !mockUser ) return rejectWithValue( 'Wrong password or username!' );

            localStorage.setItem( 'username', mockUser.username );
            localStorage.setItem( 'auth', 'true' );
            return fulfillWithValue( mockUser );
        } catch ( err ) {
            console.log( err );
            return rejectWithValue( 'Something went wrong!' );
        }

    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await userService.logout();

        localStorage.removeItem( 'username' );
        localStorage.removeItem( 'auth' );
    }
);