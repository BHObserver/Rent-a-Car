import React from 'react';
import {
  Route, Routes, Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpForm from './components/sessions/Signup';
import LoginForm from './components/sessions/Login';
import Logout from './components/sessions/Logout';
import Profile from './components/Profile';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
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

      <Routes>
        <Route exact path="/" element={<h2>Welcome to My App</h2>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
