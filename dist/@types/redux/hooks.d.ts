import { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
type DispatchFunc = () => AppDispatch;
export declare const useAppDispatch: DispatchFunc;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export {};
