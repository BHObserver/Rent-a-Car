import { Outlet } from 'react-router';
import NavBar from './NavBar';

const Layout = () => (
  <div className="flex">
    <NavBar />
    <Outlet />
  </div>
);

export default Layout;
