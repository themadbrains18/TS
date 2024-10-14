import { combineReducers } from 'redux';
import templateReducer from "@/store/slices/templateSlice"
import authReducer from "@/store/slices/authSlice"
// Import other reducers as needed

const rootReducer = combineReducers({
    template: templateReducer,
    auth: authReducer,
    // Add other reducers here
});

export default rootReducer;
