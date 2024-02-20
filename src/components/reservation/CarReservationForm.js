/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [showCarSelection, setShowCarSelection] = useState(false);
  const [availableCars, setAvailableCars] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const cars = useSelector((state) => state.car.cars.cars) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

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
      setSelectedCarId('');
      setError('');
      dispatch(fetchCars());
      const updatedAvailableCars = cars.filter((car) => car.available);
      setAvailableCars(updatedAvailableCars);
      setShowCarSelection(false);
    } catch (error) {
      setFailureMessage('Error reserving car');
    }
  };

  const handleFindAvailableCars = () => {
    const availableCars = cars.filter((car) => car.available);
    setAvailableCars(availableCars);
    setShowCarSelection(true);
  };

  // Check if the user is on the reservation page
  const isOnReservationPage = window.location.pathname === '/reserve';

  return (
    <div className="reservation-page">
      <button type="button" onClick={() => navigate('/profile')}>Back to Profile</button>
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
        <form onSubmit={handleSubmit}>
          <label>
            Reserved Date:
            <input type="date" value={reservedDate} onChange={(e) => setReservedDate(e.target.value)} required />
          </label>
          <label>
            Start Time:
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </label>
          <label>
            Start Location:
            <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required />
          </label>
          <label>
            Destination:
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          </label>
          <label>
            Total Cost:
            <input type="number" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required />
          </label>
          <div className="button-container">
            <button type="button" onClick={handleFindAvailableCars}>Find Available Cars</button>
            {showCarSelection && (
            <label>
              Select a Car:
              <select
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
                required
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
            )}
            <button type="submit">Submit</button>
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
