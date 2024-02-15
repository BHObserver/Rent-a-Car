// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../sessions/Logout';
/* import './Sidebar.css'; */

const Sidebar = () => (
  <div className="sidebar">
    <NavLink to="/" exact className="logo" activeClassName="active">
      Your Logo
    </NavLink>
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/reserve" className="nav-link" activeClassName="active">
            Reserved Items
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-reservations" className="nav-link" activeClassName="active">
            My Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/reserve-item" className="nav-link" activeClassName="active">
            Reserve Item Page
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-item1" className="nav-link" activeClassName="active">
            Add Item1
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-item" className="nav-link" activeClassName="active">
            Add Item Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete-item" className="nav-link" activeClassName="active">
            Delete Item
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="nav-link" activeClassName="active">
            <Logout />
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
