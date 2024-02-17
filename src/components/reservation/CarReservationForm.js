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
  const [availableCars, setAvailableCars] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const cars = useSelector((state) => state.car.cars.cars) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    } catch (error) {
      console.error('Error reserving car:', error);
    }
  };

  const handleFindAvailableCars = () => {
    const selectedStartTime = new Date(startTime);
    const selectedEndTime = new Date(endTime);
    const availableCars = cars.filter((car) => {
      const reservations = car.reservations || [];
      return reservations.every((reservation) => {
        const reservationStartTime = new Date(reservation.start_time);
        const reservationEndTime = new Date(reservation.end_time);
        return (
          selectedEndTime <= reservationStartTime || selectedStartTime >= reservationEndTime
        );
      });
    });
    setAvailableCars(availableCars);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs */}
        <label htmlFor="reservedDate">
          Reserved Date:
          <input
            id="reservedDate"
            type="date"
            value={reservedDate}
            onChange={(e) => setReservedDate(e.target.value)}
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
          />
        </label>
        <br />
        <button type="button" onClick={handleFindAvailableCars}>
          Find Available Cars
        </button>
        <br />
        <label htmlFor="carSelection">
          Select a Car:
          <select
            id="carSelection"
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
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
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CarReservationForm;
