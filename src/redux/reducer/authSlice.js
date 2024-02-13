import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    refreshAccessTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
      state.error = null;
    },
    refreshAccessTokenFailure: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  signUpSuccess,
  signUpFailure,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
