import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import carReducer from './reducer/carReducer';
import reservationReducer from './reducer/reservationReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    reservations: reservationReducer,
  },
});

export default store;
