import { AnyAction, createAsyncThunk, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import postAPI from '../services/postSevice';
import { eventActionsCreators } from '../store/reducers/event/slice';
import { authActionsCreators } from '../store/reducers/auth/slice';
import { NavigateFunction } from 'react-router-dom';
import { ERoutes } from '../pages';
import { TRootState } from '../store';

const pagesConfig: Record<string, Partial<IPageOptions>> = {
    [ERoutes.POST]: {
        actions: [
            {
                cb: postAPI.endpoints.fetchAllPosts.initiate,
                async: true,
            }
        ],
    },
    [ERoutes.LOGIN]: {
        authRequirement: false,
    },
    [ERoutes.HOME]: {
        authRequirement: true,
        actions: [
            {
                cb: eventActionsCreators.fetchEvents,
                canRefetch: true,
                async: true
            },
            {
                cb: eventActionsCreators.fetchGuests,
                canRefetch: ( ( { event } ) => !event.guests.length ),
            }
        ]
    }
};

interface IPageOption { 
    //* callback returning action creator
    cb: () => AnyAction | ThunkAction<any, any, any, AnyAction>;
    //* cb are sync if not defined
    async?: true;
    //* cb calling once if not defined, not working with API action creators(they are calling once by default)
    canRefetch?: boolean | ( ( state: TRootState ) => boolean );
}

interface IPageOptions {
    actions: Array<IPageOption>,
    authRequirement: null | boolean,
}

interface IAuthProtection {
    unAuthorized: string,
    authorized: string
}

class StateSetUpConfig {
    private isAuth = false;
    private basePageOptions: IPageOptions = {
        actions: [],
        authRequirement: null,
    };

    private authProtection: IAuthProtection = {
        unAuthorized: '/login',
        authorized: '/'
    };

    private pagesOptions = pagesConfig;

    private getPageOption( path: string ) {
        const { actions, authRequirement } = { ...this.basePageOptions, ...this.pagesOptions[path] };
        let redirectTo = null;

        if ( authRequirement !== null ) {
            redirectTo = authRequirement
                ? !this.isAuth
                    ? this.authProtection.unAuthorized
                    : null
                : this.isAuth
                    ? this.authProtection.authorized
                    : null;
        }

        return { actions, redirectTo };
    }

    private async checkAuthorization( dispatch: ThunkDispatch<unknown, unknown, AnyAction> ): Promise<void> {
        if ( localStorage.getItem( 'auth' ) ) {
            await dispatch( authActionsCreators.setIsAuth( true ) );
            await dispatch( authActionsCreators.setUser( { username: localStorage.getItem( 'username' ) || '' } ) );
            this.isAuth = true;
        }
    }

    private async callActions( actions: IPageOptions['actions'], dispatch: ThunkDispatch<unknown, unknown, AnyAction>, getState: () => unknown ) {
        for ( let i = 0; i < actions.length; i++ ) {
            const action = actions[i];
            const isAsync = action.async;
            let canRefetch = null;
            if ( typeof action.canRefetch === 'function' ) {
                canRefetch = action.canRefetch( getState() as TRootState );
            } else if ( typeof action.canRefetch === 'boolean' ) {
                canRefetch = action.canRefetch;
            } else {
                action.canRefetch = false;
                canRefetch = true;
            }

            console.log( { canRefetch } );
            if ( canRefetch ) {
                if ( isAsync ) {
                    await ( dispatch( action.cb() ) );
                } else {
                    dispatch( action.cb() );
                }
            }
        }
    }

    public setUp = createAsyncThunk<boolean | null, { pathname: string; navigate: NavigateFunction }, { fulfilledMeta: null, rejectValue: string }>(
        'app/stateSetUp',
        async ( { pathname, navigate }, { rejectWithValue, fulfillWithValue, getState, dispatch } ) => {
            try {
                console.log( 'app/stateSetUp::start' );
                await this.checkAuthorization( dispatch );

                const { actions, redirectTo } = this.getPageOption( pathname );
                if ( redirectTo ) {
                    navigate( redirectTo );
                    return fulfillWithValue( null, null );
                }
                await this.callActions( actions, dispatch, getState );

                console.log( 'app/stateSetUp::end', { pathname, redirectTo } );
                return fulfillWithValue( redirectTo === null, null );
            } catch ( err ) {
                console.log( 'app/stateSetUp', err );
                return rejectWithValue( 'Something went wrong!' );
            }

        }
    );
}

export default new StateSetUpConfig();