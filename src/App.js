import React from 'react';
import {
  BrowserRouter, Route, Routes, Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpForm from './components/sessions/Signup';
import LoginForm from './components/sessions/Login';
import Logout from './components/sessions/Logout';
import Profile from './components/Profile';
import Sidebar from './components/navigation/Sidebar';
import ReserveItemPage from './components/ReserveItemPage';
import AddItemPage from './components/AddItemPage';
import './App.css';

const Reserve = () => <h2>Reserve For Page</h2>;
const MyReservations = () => <h2>My Reservations Page</h2>;
const AddItem = () => <h2>Add Item Page</h2>;
const DeleteItem = () => <h2>Deleted Items Page</h2>;

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="contents">
          <div>
            <h1>My App</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <Routes>
            <Route exact path="/" element={<h2>Welcome to My App</h2>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/reserve-item" element={<ReserveItemPage />} />
            <Route path="/my-reservations" element={<MyReservations />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/add-item1" element={<AddItem />} />
            <Route path="/delete-item" element={<DeleteItem />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
