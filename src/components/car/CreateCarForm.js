// CarForm.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { createCar } from '../../redux/actions/carActions';
/* import './CarForm.css'; */

function CarForm() {
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const carData = {
      name,
      make,
      model,
      year: parseInt(year, 10), // Ensure year is parsed as an integer
      user_id: user.accessToken,
    };
    try {
      await dispatch(createCar(carData));
      setSuccessMessage('Car created successfully!');
      // Reset form fields after successful submission
      setName('');
      setMake('');
      setModel('');
      setYear('');
    } catch (error) {
      console.error('Error creating car:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="car-form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <TextField
          fullWidth
          label="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <br />
        <TextField
          fullWidth
          label="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <br />
        <TextField
          fullWidth
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Create Car
        </Button>
      </form>
      {successMessage && <Typography variant="body1">{successMessage}</Typography>}
    </div>
  );
}

export default CarForm;
