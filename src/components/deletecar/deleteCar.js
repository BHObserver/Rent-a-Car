import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation } from '../../redux/actions/carActions';

const DeleteCar = () => {
  const userReservations = useSelector((state) => state.car.userReservations);
  const [successNotice, setSuccessNotice] = useState(false);

  const dispatch = useDispatch();

  const deleteReservationHandler = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    setSuccessNotice(true);
  };

  useEffect(() => {
  }, [userReservations]);

  return (
    <div>
      {userReservations.map((reservation) => (
        <div key={reservation.id}>
          <img src={reservation.car.photo} alt={reservation.car.name} />
          <p>{reservation.car.name}</p>
          <button
            type="button"
            onClick={() => deleteReservationHandler(reservation.id)}
          >
            Delete
          </button>
        </div>
      ))}
      {successNotice && (
        <p className="text-center text-sky-500 text-lg mt-4">Reservation deleted successfully!</p>
      )}
    </div>
  );
};

export default DeleteCar;
