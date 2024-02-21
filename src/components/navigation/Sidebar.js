import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/session/actions/authActions';
import logo from '../../assets/images/logo.png';

const StyledList = styled(List)({
  display: 'flex',
});

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          zIndex: 1,
          alignItems: 'flex-start', // Position sidebar to the top-left corner
          justifyContent: 'flex-start',
          width: '20px',
          height: '20px',
          padding: '10px',
          color: '#fff',
        }} // Adjust position as needed
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
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
          <div className="logo-container">
            <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
            <h2>RENT A CAR</h2>
          </div>
          {' '}
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
            <ListItemIcon><EventIcon /></ListItemIcon>
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
          <ListItem button component={NavLink} onClick={handleLogout} to="/login">
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        {/* Social Media Icons */}
        <StyledList>
          <ListItem button component="a" href="https://www.facebook.com">
            <ListItemIcon><FacebookIcon /></ListItemIcon>
          </ListItem>
          <ListItem button component="a" href="https://www.twitter.com">
            <ListItemIcon><TwitterIcon /></ListItemIcon>
          </ListItem>
          <ListItem button component="a" href="https://www.instagram.com">
            <ListItemIcon><InstagramIcon /></ListItemIcon>
          </ListItem>
        </StyledList>
      </Drawer>
    </>
  );
};

export default Sidebar;
