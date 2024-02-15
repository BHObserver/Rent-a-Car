import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import carsReducer from './reducer/carReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,

  },
});

export default store;
