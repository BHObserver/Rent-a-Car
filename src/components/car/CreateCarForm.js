import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createCar } from '../../redux/actions/carActions';
import './styles/CreateCarForm.css';

function CarForm() {
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user ? user.accessToken : null;

    const carData = {
      name,
      make,
      model,
      year: parseInt(year, 10),
      photo_url: photoUrl,
      user_id: userId,
    };

    try {
      await dispatch(createCar(carData));
      setSuccessMessage('Car created successfully!');
      setName('');
      setMake('');
      setModel('');
      setYear('');
      setPhotoUrl('');
      setErrorMessage('');
      navigate('/delete-item');
    } catch (error) {
      console.error('Error creating car:', error);
      setErrorMessage('Failed to create car. Please try again.'); // Set error message
    }
  };

  return (
    <div className="car-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="form">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label htmlFor="form">
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </label>
        <label htmlFor="form">
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </label>
        <label htmlFor="form">
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <label htmlFor="form">
          Photo URL:
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <button type="submit">Add Car</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CarForm;
