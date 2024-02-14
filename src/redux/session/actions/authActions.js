import axios from 'axios';
import {
  signUpSuccess,
  signUpFailure,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from '../../reducer/authSlice';

export const signUp = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/register', { user: { username, email, password } });
    dispatch(signUpSuccess(response.data));
  } catch (error) {
    dispatch(signUpFailure(error.response.data));
  }
};

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/refresh-token', { refreshToken });
    dispatch(refreshAccessTokenSuccess(response.data.accessToken));
  } catch (error) {
    dispatch(refreshAccessTokenFailure(error.response.data));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/login', { email, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete('http://localhost:3000/api/v1/logout');
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.response.data));
  }
};

export const clearError = () => ({ type: 'auth/clearError' });
