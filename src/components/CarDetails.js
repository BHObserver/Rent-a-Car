import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarById } from '../redux/actions/carActions';

const CarDetails = ({ carId }) => {
  const dispatch = useDispatch();
  const [carDetails, setCarDetails] = useState(null);
  const isLoading = useSelector((state) => state.car.isLoading);

  useEffect(() => {
    dispatch(fetchCarById(carId));
  }, [dispatch, carId]);

  console.log(carDetails);
  const car = useSelector((state) => state.car.car);

  useEffect(() => {
    if (car) {
      setCarDetails(car);
    }
  }, [car]);

  if (isLoading || !carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{carDetails.name}</h1>
      <img src={carDetails.photo_url} alt={carDetails.name} />
      <p>
        Make:
        {carDetails.make}
      </p>
      <p>
        Model:
        {carDetails.model}
      </p>
      <p>
        Year:
        {carDetails.year}
      </p>
    </div>
  );
};

CarDetails.propTypes = {
  carId: PropTypes.number.isRequired,
};

export default CarDetails;
