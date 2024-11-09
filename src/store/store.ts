import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; 

/**
 * Redux Store Configuration using @reduxjs/toolkit's `configureStore`.
 * Types:
 * - `RootState`: A type representing the overall state structure of the Redux store, 
 *   derived from the return type of `store.getState`.
 * - `AppDispatch`: A type for the dispatch function, ensuring type safety when dispatching actions.
 * 
 * Notes:
 * - `configureStore` automatically adds some default middleware, like `redux-thunk`, 
 *   that helps with handling asynchronous logic.
 * - The `RootState` and `AppDispatch` types are used to provide type safety when working 
 *   with the Redux store and dispatching actions, respectively.
 */

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
