import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import CarDetails from './CarDetails';

const StyledCard = styled(Card)({
  maxWidth: '100%',
  margin: 'auto',
  cursor: 'pointer',
});

const CarCard = ({ car }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const handleClick = () => {
    setIsDetailsVisible(true);
  };

  return (
    <>
      {!isDetailsVisible && (
        <StyledCard onClick={handleClick}>
          <CardMedia
            component="img"
            height="400"
            image={car.photo_url}
            alt={car.name}
          />
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {car.name}
            </Typography>
          </CardContent>
        </StyledCard>
      )}

      {isDetailsVisible && ( // Render CarDetails if details are visible
        <CarDetails carId={car.id} />
      )}
    </>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarCard;
