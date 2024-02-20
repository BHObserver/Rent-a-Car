// App.js

import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/sessions/Signup';
import LoginForm from './components/sessions/Login';
import Profile from './components/Profile';
import CarDetails from './components/CarDetails';
import DeleteCar from './components/car/DeleteCar';
import Sidebar from './components/navigation/Sidebar';
import Reserve from './components/reservation/CarReservationForm';
import UserReservations from './components/reservation/UserReservations';
import CreateCar from './components/car/CreateCarForm';
import { loginSuccess } from './redux/reducer/authSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Check for authentication token in localStorage on app initialization
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Dispatch an action to set the user as authenticated
      dispatch(loginSuccess({ accessToken }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        {user ? (
          <>
            <Sidebar />
            <main className="contents">
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/reserve" element={<Reserve />} />
                <Route path="/my-reservations" element={<UserReservations />} />
                <Route path="/add-item" element={<CreateCar />} />
                <Route path="/delete-item" element={<DeleteCar />} />
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/cars/:id" element={<CarDetails />} />
              </Routes>
            </main>
          </>
        ) : (
          <main className="contents">
            <Routes>
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
