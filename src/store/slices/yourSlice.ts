import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState: {},
  reducers: {
    // Define your reducers here
  },
});

export const { actions } = yourSlice;
export default yourSlice.reducer;
