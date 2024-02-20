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
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
