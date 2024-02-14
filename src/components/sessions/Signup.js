import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '../../redux/session/actions/authActions';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State to manage the visibility of the error message
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // State to manage the visibility of the success message
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');

  // Effect to show the error message for 3 seconds when error changes
  useEffect(() => {
    let timer;
    if (error) {
      setShowError(true);
      setErrorMessage(error.errors ? error.errors[0] : 'An error occurred');
      timer = setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
        dispatch(clearError());
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  // Effect to show the success message for 3 seconds when success message changes
  useEffect(() => {
    let timer;
    if (successMessage) {
      setShowSuccess(true);
      setSuccessMessageText(successMessage);
      timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessageText('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(username, email, password));
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      // eslint-disable-next-line
      console.log('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Display error message if available */}
      {showError && <div>{errorMessage}</div>}
      {/* Display success message if available */}
      {showSuccess && <div>{successMessageText}</div>}
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
    </div>
  );
};

export default SignUpForm;
