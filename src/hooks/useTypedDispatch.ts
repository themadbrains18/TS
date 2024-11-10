import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store'; 

/**
 * Custom hook that provides a typed version of the Redux dispatch function.
 * 
 */
const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
