// DeleteCar.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Button, List, ListItem, ListItemText,
} from '@mui/material';
import { fetchCars, deleteCar } from '../../redux/actions/carActions';
import './DeleteCar.css';

function DeleteCar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cars = useSelector((state) => state.car.cars.cars) || [];
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = async (carId) => {
    try {
      await dispatch(deleteCar(carId));
      dispatch(fetchCars());
      setSuccessMessage('Car deleted successfully'); // Set success message after successful deletion
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const userCars = cars.filter((car) => car.user_id === Number(user.accessToken));

  return (
    <div className="delete-car-container">
      <h1>Your Cars</h1>
      {successMessage && <Typography variant="body1">{successMessage}</Typography>}
      {userCars.length === 0 ? (
        <Typography variant="body1">You have not added any car.</Typography>
      ) : (
        <List>
          {userCars.map((car) => (
            <ListItem key={car.id}>
              <ListItemText primary={car.name} />
              <Button variant="contained" color="error" onClick={() => handleDelete(car.id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default DeleteCar;
