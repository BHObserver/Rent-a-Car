import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, CircularProgress } from '@mui/material';
import { fetchUserReservations, deleteReservation } from '../../redux/actions/reservationActions';
import './UserReservation.css';

const UserReservations = () => {
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userReservations = useSelector((state) => state.reservations.userReservations);
  const [successNotice, setSuccessNotice] = useState(false);
  const isLoading = useSelector((state) => state.reservations.isLoading);

  useEffect(() => {
    dispatch(fetchUserReservations(userId.accessToken));
  }, [dispatch, userId.accessToken]);

  const deleteReservationHandler = async (reservationId) => {
    try {
      await dispatch(deleteReservation(reservationId));
      setSuccessNotice(true);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="user-reservations-container">
      {userReservations.length === 0 ? (
        <Typography variant="body1" className="no-reservations-msg">No reservations to delete.</Typography>
      ) : (
        userReservations.map((reservation) => (
          <div key={reservation.id} className="reservation-item">
            <Typography variant="body1" className="reservation-details">
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
            </Typography>
            <Button variant="contained" color="error" onClick={() => deleteReservationHandler(reservation.id)}>
              Delete
            </Button>
          </div>
        ))
      )}
      {successNotice && <Typography variant="body1" className="success-notice">Reservation deleted successfully!</Typography>}
    </div>
  );
};

export default UserReservations;
