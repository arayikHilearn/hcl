import { useEffect } from 'react';
import { useActions } from './redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const usePageStateSetUp = () => {
    const { stateSetUp } = useActions();
    const { pathname } = useLocation();
    const navigate = useNavigate();
 
    useEffect( () => {
        console.log( 'usePageStateSetUp: watcher on change pathname' );
        stateSetUp( { pathname, navigate } );
    }, [ pathname ] );

    return pathname;
};