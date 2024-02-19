import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/auth/authSlice';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';

const Layout = () => {
  const navigation = useNavigate();
  const userTrue = useSelector(getUser);

  useEffect(() => {
    if (!userTrue) {
      return navigation('/auth');
    }
    return () => {};
  }, [userTrue]);

  return (
    <>
      <MobileMenu />
      <div className="flex">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
