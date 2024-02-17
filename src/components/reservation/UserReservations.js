import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReservations, deleteReservation } from '../../redux/actions/reservationActions';

const DeleteCar = () => {
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userReservations = useSelector((state) => state.reservations.userReservations);
  const [successNotice, setSuccessNotice] = useState(false);
  const isLoading = useSelector((state) => state.reservations.isLoading);

  useEffect(() => {
    dispatch(fetchUserReservations(userId.accessToken));
  }, [dispatch, userId.accessToken]);

  if (isLoading) {
    return <p>Loading reservations...</p>;
  }

  const deleteReservationHandler = async (reservationId) => {
    try {
      await dispatch(deleteReservation(reservationId));
      setSuccessNotice(true);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div>
      {userReservations.length === 0 ? (
        <p>No reservations to delete.</p>
      ) : (
        userReservations.map((reservation) => (
          <div key={reservation.id}>
            Reserved Date:
            {' '}
            {reservation.reserved_date}
            , Start Time:
            {' '}
            {reservation.start_time}
            , End Time:
            {' '}
            {reservation.end_time}
            , Start Location:
            {' '}
            {reservation.start_location}
            , Destination:
            {' '}
            {reservation.destination}
            , Total Cost:
            {' '}
            {reservation.total_cost}

            <button
              type="button"
              onClick={() => deleteReservationHandler(reservation.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
      {successNotice && (
        <p className="text-center text-sky-500 text-lg mt-4">Reservation deleted successfully!</p>
      )}
    </div>
  );
};

export default DeleteCar;
