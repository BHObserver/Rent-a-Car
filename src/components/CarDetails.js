import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { fetchCarById } from '../redux/actions/carActions';

const CarDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { car, isLoading, error } = useSelector((state) => state.car);
  const carId = Number(id);
  console.log(useSelector((state) => state));
  console.log(car);

  useEffect(() => {
    dispatch(fetchCarById(carId));
  }, [dispatch, carId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !car) {
    return <Typography variant="body1" color="error">Error fetching car details</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">{car.name}</Typography>
      <img src={car.photo_url} alt={car.name} />
      <Typography variant="body1">
        Make:
        {' '}
        {car.make}
      </Typography>
      <Typography variant="body1">
        Model:
        {' '}
        {car.model}
      </Typography>
      <Typography variant="body1">
        Year:
        {' '}
        {car.year}
      </Typography>
    </div>
  );
};

export default CarDetails;
