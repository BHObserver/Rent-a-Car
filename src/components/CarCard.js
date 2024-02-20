// CarCard.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  maxWidth: '100%',
  margin: 'auto',
  cursor: 'pointer',
});

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardMedia component="img" height="400" image={car.photo_url} alt={car.name} />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Make:
          {' '}
          {car.make}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Model:
          {' '}
          {car.model}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarCard;
