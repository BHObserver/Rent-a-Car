/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack } from '@mui/icons-material';
import { fetchCars } from '../../redux/actions/carActions';
import { createReservation } from '../../redux/actions/reservationActions';
import './CarReservationForm.css';

function CarReservationForm() {
  const [reservedDate, setReservedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [selectedCarId, setSelectedCarId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [error, setError] = useState('');
  const [availableCars, setAvailableCars] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const cars = useSelector((state) => state.car.cars.cars) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get car ID from URL params

  useEffect(() => {
    dispatch(fetchCars());
    // If car ID is provided in the URL, set it as the selected car ID
    if (id) {
      setSelectedCarId(id);
    }
  }, [dispatch, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateFields = () => {
      if (!reservedDate
        || !startTime
        || !endTime
        || !startLocation
        || !destination
        || !totalCost
        || !selectedCarId) {
        setError('Please fill in all fields.');
        return false;
      }
      return true;
    };

    if (!validateFields()) {
      return;
    }

    const reservationData = {
      reserved_date: reservedDate,
      start_time: startTime,
      end_time: endTime,
      total_cost: totalCost,
      start_location: startLocation,
      destination,
      user_id: user.accessToken,
      car_id: selectedCarId,
    };

    try {
      await dispatch(createReservation(reservationData));
      setSuccessMessage('Car reserved successfully!');
      setReservedDate('');
      setStartTime('');
      setEndTime('');
      setStartLocation('');
      setDestination('');
      setTotalCost('');
      setError('');
      dispatch(fetchCars());
      const updatedAvailableCars = cars.filter((car) => car.available);
      setAvailableCars(updatedAvailableCars);
      // If a car was selected from the details page, reset the selectedCarId
      setSelectedCarId('');
      navigate('/profile'); // Navigate back to profile after reservation
    } catch (error) {
      setFailureMessage('Error reserving car');
    }
  };

  const handleFindAvailableCars = () => {
    const availableCars = cars.filter((car) => car.available);
    setAvailableCars(availableCars);
  };

  // Show available cars button and car selection field only if no car is selected
  const showCarSelection = !selectedCarId;
  // Check if the user is on the reservation page
  const isOnReservationPage = window.location.pathname === `/reserve/${id}` || '/reserve';

  const StyledIconButtonLeft = styled(IconButton)({
    position: 'absolute',
    top: '30px',
    left: '10px',
    transform: 'translateY(-50%)',
    backgroundColor: '#96bf01',
    border: '1px solid #fff',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '100% 20% 20% 100%',
    '&:hover': {
      backgroundColor: '#0d47a1',
    },
  });

  return (
    <div className="reservation-page">
      <StyledIconButtonLeft
        aria-label="back to profile"
        onClick={() => navigate('/profile')}
        sx={{ mr: 2 }} // Adjust margin as needed
      >
        <ArrowBack />
      </StyledIconButtonLeft>
      <style>
        {`
        .MuiDrawer-root.MuiDrawer-docked.css-q56gz0-MuiDrawer-docked {
          display: ${isOnReservationPage ? 'none' : 'block'};
        }
        main {
          background-image: linear-gradient(#96bf01ad, #a3cb14bc), url(https://www.travelperk.com/wp-content/uploads/car-rental-companies-1-scaled.jpg);
          background-size: cover;
        }
      `}
      </style>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="input-container">
            <label>
              Reserved Date:
              <input type="date" className="input-field" value={reservedDate} onChange={(e) => setReservedDate(e.target.value)} required />
            </label>
            <label>
              Start Time:
              <input type="datetime-local" className="input-field" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </label>
            <label>
              End Time:
              <input type="datetime-local" className="input-field" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </label>
            <label>
              Start Location:
              <input type="text" className="input-field" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
            </label>
            <label>
              Destination:
              <input type="text" className="input-field" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </label>
            <label>
              Total Cost:
              <input type="number" className="input-field" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required />
            </label>
          </div>
          <div className="button-container">
            {showCarSelection && (
            <button type="button" onClick={handleFindAvailableCars} className="form-button">Find Available Cars</button>
            )}
            {showCarSelection && availableCars.length > 0 && (
            <div className="select-container">
              <label>
                Select a Car:
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  required
                  className="select-car"
                >
                  <option value="">Select a Car</option>
                  {availableCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.make}
                      {' '}
                      {car.model}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            )}
            <button type="submit" className="form-button">Submit</button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        {failureMessage && <p>{failureMessage}</p>}
      </div>
    </div>
  );
}

export default CarReservationForm;
