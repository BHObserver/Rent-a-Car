import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { logout } from '../../redux/session/actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  const handleLogout = async () => {
    try {
      dispatch(logout()); // Wait for logout action to complete
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
