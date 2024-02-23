/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { login, clearError } from '../../redux/session/actions/authActions';
import './styles/LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function from useNavigate hook
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Effect to clear error after 3 seconds
  useEffect(() => {
    let errorTimer;
    if (error) {
      errorTimer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
    return () => clearTimeout(errorTimer);
  }, [error, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
    // Navigate to profile after successful login
    navigate('/profile');
  };

  return (
    <div className="background">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login Here</h3>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">Login</button>
        <p>
          Don&apos;t have an account yet?
          <Link to="/signup">Sign up here.</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
