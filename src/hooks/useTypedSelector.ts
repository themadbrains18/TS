import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@/store/store';


/**
 * Custom hook that provides a typed version of the Redux `useSelector` hook.
 */

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
