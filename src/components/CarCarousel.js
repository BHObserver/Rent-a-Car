import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/system';
import CarCard from './CarCard';
import './CarCarousel.css';

// Styled components
const CarouselContainer = styled('div')({
  margin: '20px auto',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const StyledIconButtonLeft = styled(IconButton)({
  position: 'absolute',
  top: '80%',
  left: '270px',
  transform: 'translateY(-50%)',
  backgroundColor: '#2196f3',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '100% 20% 20% 100%',
  '&:hover': {
    backgroundColor: '#0d47a1',
  },
});

const StyledIconButtonRight = styled(IconButton)({
  position: 'absolute',
  top: '30%',
  right: '20px',
  transform: 'translateY(-50%)',
  backgroundColor: '#2196f3',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '20% 100% 100% 20%',
  '&:hover': {
    backgroundColor: '#0d47a1',
  },
});

const CarCarousel = ({
  cars, currentIndex, handlePrev, handleNext,
}) => (
  <CarouselContainer>
    <div className="carousel-container">
      <StyledIconButtonLeft onClick={handlePrev} disabled={currentIndex === 0}>
        <ArrowBack />
      </StyledIconButtonLeft>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CarCard car={cars[currentIndex]} />
        </Grid>
      </Grid>
      <StyledIconButtonRight onClick={handleNext} disabled={currentIndex === cars.length - 1}>
        <ArrowForward />
      </StyledIconButtonRight>
    </div>
  </CarouselContainer>
);

CarCarousel.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default CarCarousel;
