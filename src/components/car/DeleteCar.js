import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, deleteCar } from '../../redux/actions/carActions';

function DeleteCar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cars = useSelector((state) => state.car.cars.cars) || [];
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = async (carId) => {
    try {
      await dispatch(deleteCar(carId));
      dispatch(fetchCars());
      setSuccessMessage('Car deleted successfully'); // Set success message after successful deletion
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const userCars = cars.filter((car) => car.user_id === Number(user.accessToken));

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      {userCars.length === 0 ? (
        <p>You haven&apos;t added any car.</p>
      ) : (
        <ul>
          {userCars.map((car) => (
            <li key={car.id}>
              <span>{car.name}</span>
              <button type="button" onClick={() => handleDelete(car.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteCar;
