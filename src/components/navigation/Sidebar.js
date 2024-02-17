// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../sessions/Logout';
import './Sidebar.css'; // Import CSS file

const Sidebar = () => (
  <div className="sidebar">
    <NavLink to="/" exact className="logo">
      Your Logo
    </NavLink>
    <nav className="navigation">
      <ul className="nav-links">
        <li>
          <NavLink to="/profile" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/reserve" activeClassName="active">
            Reserve
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-reservations" activeClassName="active">
            My Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-item" activeClassName="active">
            Add Car
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete-item" activeClassName="active">
            Delete Car
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <Logout />
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
