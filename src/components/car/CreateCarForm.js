import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCar } from '../../redux/actions/carActions';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          id="make"
          type="text"
          value={make}
          placeholder="Make"
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <br />
        <input
          id="model"
          type="text"
          value={model}
          placeholder="Model"
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <br />
        <input
          id="year"
          type="number"
          value={year}
          placeholder="Year"
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create Car</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CarForm;
