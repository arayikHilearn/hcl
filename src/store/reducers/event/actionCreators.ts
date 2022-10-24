import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEvent } from '../../../models/event';
import userService from '../../../services/userService';
import eventService from '../../../services/eventService';
import { IAuthState } from '../auth';

export const fetchGuests = createAsyncThunk(
    'event/fetchGuests',
    async ( _, { rejectWithValue, fulfillWithValue, getState } ) => {
        try {
            const { auth: { user: authUser } } = getState() as {auth: IAuthState};
            const mockUsers = await userService.get( authUser?.username );

            return fulfillWithValue( mockUsers );
        } catch ( err ) {
            return rejectWithValue( 'Something went wrong!' );
        }

    }
);
 
export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async ( _, { rejectWithValue, fulfillWithValue } ) => {
        try {
            const mockEvents = await eventService.get();

            return fulfillWithValue( mockEvents );
        } catch ( err ) {
            return rejectWithValue( 'Something went wrong!' );
        }

    }
);

export const createEvent = createAsyncThunk(
    'event/create',
    async ( event: IEvent, { rejectWithValue, fulfillWithValue } ) => {
        try {
            const mockEvent = await eventService.create( event );

            return fulfillWithValue( mockEvent );
        } catch ( err ) {
            return rejectWithValue( 'Something went wrong!' );
        }

    }
);