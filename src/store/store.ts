import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './slices/yourSlice'

const store = configureStore({
    reducer: {
        yourSlice: yourReducer, // Add your reducers here
    },
});

export default store;
