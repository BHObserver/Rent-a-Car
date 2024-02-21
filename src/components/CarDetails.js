import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, LocalTaxi } from '@mui/icons-material';
import { fetchCarById } from '../redux/actions/carActions';
import './CarDetails.css'; // Import CSS file for styling

const CarDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function
  const { id } = useParams();
  const { car, isLoading, error } = useSelector((state) => state.car);
  const carId = Number(id);

  useEffect(() => {
    dispatch(fetchCarById(carId));
  }, [dispatch, carId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !car) {
    return <div className="error-message">Error fetching car details</div>;
  }

  const handleReserveClick = () => {
    navigate(`/reserve/${car.id}`); // Navigate to reservation page with car ID
  };

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

  const StyledReserveButton = styled(IconButton)({
    position: 'absolute',
    right: '41px',
    top: '193px',
    transform: 'translateY(-50%)',
    backgroundColor: '#51a306',
    fontSize: '18px',
    color: 'white',
    width: '140px',
    height: 'auto',
    borderRadius: '1px',
    '&:hover': {
      backgroundColor: '#0d47a1',
    },
  });

  return (
    <>
      <div className="car-details-container">
        <div className="car-details-left">
          <div className="button-container-back">
            <StyledIconButtonLeft
              aria-label="back to profile"
              onClick={() => navigate('/profile')}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </StyledIconButtonLeft>
          </div>
          <img src={car.photo_url} alt={car.name} />
        </div>
        <div className="car-details-right">
          <h1>{car.name}</h1>
          <div className="detail odd-row">
            <span className="detail-label">Make:</span>
            <span className="detail-value">{car.make}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Model:</span>
            <span className="detail-value">{car.model}</span>
          </div>
          <div className="detail odd-row">
            <span className="detail-label">Year:</span>
            <span className="detail-value">{car.year}</span>
          </div>
          <div className="button-container-reserve">
            {car.available ? (
              <StyledReserveButton
                aria-label="reserve"
                onClick={handleReserveClick}
                className="reserve-button"
              >
                <LocalTaxi />
                Reserve Now!
              </StyledReserveButton>
            ) : (
              <div className="not-available">
                Not available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
