import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { fetchCars } from '../../redux/actions/carActions';
import CarCarousel from '../car/CarCarousel';
import CarCard from '../car/CarCard';
import './Profile.css';

const Container = styled('div')({
  textAlign: 'center',
  padding: '20px',
});

const Spinner = styled(CircularProgress)({
  margin: '20px',
});

const ErrorText = styled(Typography)({
  margin: '20px',
});

const Profile = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.car.cars);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handlePrev = async () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = async () => {
    setCurrentIndex((prevIndex) => Math.min(cars.length - 1, prevIndex + 1));
  };

  const handleCardClick = (carId) => {
    navigate(`/cars/${carId}`); // Use navigate to navigate to the car details page
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        <h3 className="heading"> List of Cars </h3>
      </Typography>
      {loading && <Spinner />}
      {error && (
        <ErrorText variant="body1" color="error">
          Error:
          {' '}
          {error}
        </ErrorText>
      )}
      {/* Check if cars is defined before mapping */}
      {cars && cars.length > 0 && (
        <CarCarousel
          cars={cars}
          currentIndex={currentIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          loading={loading}
        >
          {/* Render CarCard inside CarCarousel */}
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onCardClick={handleCardClick} />
          ))}
        </CarCarousel>
      )}
    </Container>
  );
};

export default Profile;
