import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    error: null,
    successMessage: '',
  },
  reducers: {
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.successMessage = 'Signed up successfully!';
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
      state.successMessage = '';
    },
    refreshAccessTokenSuccess: (state, action) => {
      state.accessToken = action.payload;
      state.error = null;
      state.successMessage = '';
    },
    refreshAccessTokenFailure: (state, action) => {
      state.error = action.payload;
      state.successMessage = '';
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.successMessage = '';
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.successMessage = '';
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.successMessage = '';
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.successMessage = '';
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
