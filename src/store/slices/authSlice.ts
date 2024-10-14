
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state of the authentication slice
interface AuthState {
  user: {
    id: string;
    name: string;
  } | null; // User data can be null when not authenticated
  isAuthenticated: boolean; // Track whether the user is authenticated
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: string; name: string }>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<{ id: string; name: string } | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Set authentication status based on user data
    },
  },
});

// Export actions and reducer
export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
