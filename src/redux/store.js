/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import carReducer from './reducer/carReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer, // Add the carReducer under the 'car' key
  },
});

export default store;
