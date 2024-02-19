// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoIcon from '@mui/icons-material/DriveEta';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/session/actions/authActions';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #009688 0%, #00796B 100%)', // Gradient background
          color: '#fff', // Text color
        },
      }}
    >
      <Typography variant="h6" align="center" sx={{ pt: 2, pb: 2 }}>
        <LogoIcon fontSize="large" />
        {' '}
        Your Logo
      </Typography>
      <Divider />
      <List>
        <ListItem button component={NavLink} to="/profile" activeClassName="active">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="/reserve" activeClassName="active">
          <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
          <ListItemText primary="Reserve" />
        </ListItem>
        <ListItem button component={NavLink} to="/my-reservations" activeClassName="active">
          <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
          <ListItemText primary="My Reservations" />
        </ListItem>
        <ListItem button component={NavLink} to="/add-item" activeClassName="active">
          <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
          <ListItemText primary="Add Car" />
        </ListItem>
        <ListItem button component={NavLink} to="/delete-item" activeClassName="active">
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText primary="Delete Car" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout} to="/login">
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
