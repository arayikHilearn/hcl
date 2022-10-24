import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../store/reducers';
import { TAppDispatch, TRootState } from '../store';
 
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators( actionCreators, dispatch );
};