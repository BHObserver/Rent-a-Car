import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/actions/carActions';
import { createReservation } from '../../redux/actions/reservationActions';

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
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateFields = () => {
      if (
        !reservedDate
        || !startTime
        || !endTime
        || !startLocation
        || !destination
        || !totalCost
        || !selectedCarId
      ) {
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
      // Reset all form fields
      setReservedDate('');
      setStartTime('');
      setEndTime('');
      setStartLocation('');
      setDestination('');
      setTotalCost('');
      setSelectedCarId('');
      setError('');
      // Dispatch action to fetch updated list of cars
      dispatch(fetchCars());
      // Update list of available cars in component state
      const updatedAvailableCars = cars.filter((car) => car.available);
      setAvailableCars(updatedAvailableCars);
      // Hide the select car field
      setShowCarSelection(false);
    } catch (error) {
      /* console.error('Error reserving car:', error); */
      setFailureMessage('Error reserving car');
    }
  };

  const handleFindAvailableCars = () => {
    const availableCars = cars.filter((car) => car.available);
    setAvailableCars(availableCars);
    setShowCarSelection(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reservedDate">
          Reserved Date:
          <input
            id="reservedDate"
            type="date"
            value={reservedDate}
            onChange={(e) => setReservedDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="startTime">
          Start Time:
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="endTime">
          End Time:
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="startLocation">
          Start Location:
          <input
            id="startLocation"
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="destination">
          Destination:
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="totalCost">
          Total Cost:
          <input
            id="totalCost"
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            required
          />
        </label>
        <br />
        <div>
          <button type="button" onClick={handleFindAvailableCars}>
            Find Available Cars
          </button>
          <br />
          {showCarSelection && (
          <label htmlFor="carSelection">
            Select a Car:
            <select
              id="carSelection"
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
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {failureMessage && <p>{failureMessage}</p>}
    </div>
  );
}

export default CarReservationForm;
