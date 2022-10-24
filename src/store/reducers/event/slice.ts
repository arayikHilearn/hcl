import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/models/user';
import { createEvent, fetchEvents, fetchGuests } from './actionCreators';
import { IEvent } from '../../../models/event';
import { IEventState } from './index';

const initialState: IEventState = {
    guests: [],
    events: [],
    isLoading: false,
    error: ''
};

const eventSlice = createSlice( {
    name: 'event',
    initialState,
    reducers: {
        setGuests( state, { payload }: PayloadAction<IUser[]> ) {
            state.guests.push( ...payload );
        },
        setEvents( state, { payload }: PayloadAction<IEvent[]> ) {
            state.events.push( ...payload );
        }
    },
    extraReducers: {
        [fetchGuests.fulfilled.type]: ( state, { payload }: PayloadAction<IUser[]> ) => {
            state.guests = payload;
            state.isLoading = false;
            state.error = '';
        },
        [fetchGuests.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchGuests.rejected.type]: ( state, { payload }: PayloadAction<string> ) => {
            state.isLoading = false;
            state.error = payload;
        },
        [createEvent.fulfilled.type]: ( state, { payload }: PayloadAction<IEvent> ) => {
            state.events.push( payload );
            state.isLoading = false;
            state.error = '';
        },
        [createEvent.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [createEvent.rejected.type]: ( state, { payload }: PayloadAction<string> ) => {
            state.isLoading = false;
            state.error = payload;
        },
        [fetchEvents.fulfilled.type]: ( state, { payload }: PayloadAction<IEvent[]> ) => {
            state.events = payload;
            state.isLoading = false;
            state.error = '';
        },
        [fetchEvents.pending.type]: ( state ) => {
            state.isLoading = true;
        },
        [fetchEvents.rejected.type]: ( state, { payload }: PayloadAction<string> ) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
} );

export const eventActionsCreators = {
    ...eventSlice.actions,
    fetchGuests,
    fetchEvents,
    createEvent 
};
export default eventSlice.reducer;
