/* eslint-disable jsx-a11y/label-has-associated-control */
// CarForm.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCar } from '../../redux/actions/carActions';
import './CreateCarForm.css';

function CarForm() {
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    const userId = user ? user.accessToken : null;

    event.preventDefault();
    const carData = {
      name,
      make,
      model,
      year: parseInt(year, 10),
      photo_url: photoUrl,
      user_id: userId,
      // user_id: user.accessToken,
    };
    try {
      await dispatch(createCar(carData));
      setSuccessMessage('Car created successfully!');
      setName('');
      setMake('');
      setModel('');
      setYear('');
      setPhotoUrl(''); // Reset photo URL state
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div className="car-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </label>
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </label>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <label>
          Photo URL:
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <button type="submit">Add Car</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CarForm;
