import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postAPI from '../services/postSevice';
import reducers from './reducers';

export const rootReducer = combineReducers( reducers );

export const setupStore = () => configureStore( {
    reducer: rootReducer,
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware()
        .concat( [ postAPI.middleware ] )
} );
 
export type TAppStore = ReturnType<typeof setupStore>;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = TAppStore['dispatch'];