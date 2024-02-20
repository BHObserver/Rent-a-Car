/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '../../redux/session/actions/authActions';
import './SignUpForm.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(username, email, password));
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="background">
      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSignUp}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
