// Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Card, CardContent, CardMedia, Typography, CircularProgress,
} from '@mui/material';
import { fetchCars } from '../redux/actions/carActions';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.car.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <Typography variant="h4" gutterBottom>
        Car List
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="body1" color="error">
          Error:
          {' '}
          {error}
        </Typography>
      )}
      {cars && cars.length > 0 && (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={car.photo}
                  alt={car.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {car.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Model:
                    {' '}
                    {car.model}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Description:
                    {' '}
                    {car.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    City:
                    {' '}
                    {car.city}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cost:
                    {' '}
                    {car.cost}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Profile;
