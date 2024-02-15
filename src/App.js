// App.js

import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/sessions/Signup';
import LoginForm from './components/sessions/Login';
import Profile from './components/Profile';
import Sidebar from './components/navigation/Sidebar';
import ReserveItemPage from './components/reservation/CarReservationForm';
import AddItemPage from './components/AddItemPage';
import { loginSuccess } from './redux/reducer/authSlice';
import './App.css';

const Reserve = () => <h2>Reserve For Page</h2>;
const MyReservations = () => <h2>My Reservations Page</h2>;
const AddItem = () => <h2>Add Item Page</h2>;
const DeleteItem = () => <h2>Deleted Items Page</h2>;

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
                <Route path="/reserve-item" element={<ReserveItemPage />} />
                <Route path="/my-reservations" element={<MyReservations />} />
                <Route path="/add-item" element={<AddItemPage />} />
                <Route path="/add-item1" element={<AddItem />} />
                <Route path="/delete-item" element={<DeleteItem />} />
                <Route path="/" element={<Navigate to="/profile" />} />
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
