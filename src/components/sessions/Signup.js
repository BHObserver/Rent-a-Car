import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '../../redux/session/actions/authActions';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(username, email, password));
    } else {
      console.log('Passwords do not match');
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <button type="button" onClick={handleClearError}>Clear Error</button>
    </div>
  );
};

export default SignUpForm;
