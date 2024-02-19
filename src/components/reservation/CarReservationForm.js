// CarReservationForm.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
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
      setFailureMessage('Error reserving car');
    }
  };

  const handleFindAvailableCars = () => {
    const availableCars = cars.filter((car) => car.available);
    setAvailableCars(availableCars);
    setShowCarSelection(true);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reserved Date"
              type="date"
              value={reservedDate}
              onChange={(e) => setReservedDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Cost"
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleFindAvailableCars}>
              Find Available Cars
            </Button>
          </Grid>
          {showCarSelection && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="car-selection-label">Select a Car</InputLabel>
                <Select
                  labelId="car-selection-label"
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  required
                >
                  <MenuItem value="">Select a Car</MenuItem>
                  {availableCars.map((car) => (
                    <MenuItem key={car.id} value={car.id}>
                      {car.make}
                      {' '}
                      {car.model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {successMessage && <Typography variant="body1">{successMessage}</Typography>}
      {failureMessage && <Typography variant="body1">{failureMessage}</Typography>}
    </div>
  );
}

export default CarReservationForm;
