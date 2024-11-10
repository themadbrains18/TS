import { combineReducers } from 'redux';
import templateReducer from "@/store/slices/templateSlice"
import authReducer from "@/store/slices/authSlice"

/**
 * Root reducer for combining multiple reducers into one.
 */
const rootReducer = combineReducers({
    template: templateReducer,
    auth: authReducer,
});

export default rootReducer;
