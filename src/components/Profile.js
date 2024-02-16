import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCars from '../redux/actions/carActions';
import '../App.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.car) || {};

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      <h2>Car List</h2>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Error:
          {error}
        </div>
      )}
      {cars && cars.length > 0 && (
        <div className="car-list">
          {cars.map((car) => (
            <div key={car.id} className="car-item">
              <img src={car.photo} alt={car.name} className="car-photo" />
              <div className="car-details">
                <div className="car-name">{car.name}</div>
                <div className="car-model">{car.model}</div>
                <div className="car-details">{car.details}</div>
                <div className="car-city">
                  City:
                  {car.city}
                </div>
                <div className="car-cost">
                  Cost:
                  {car.cost}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
