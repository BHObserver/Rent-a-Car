import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/session/actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Logout</h2>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
