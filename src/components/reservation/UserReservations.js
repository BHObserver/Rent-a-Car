import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReservations } from '../../redux/actions/reservationActions';

function UserReservations() {
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.userReservations);
  const isLoading = useSelector((state) => state.reservations.isLoading);

  useEffect(() => {
    dispatch(fetchUserReservations(userId.accessToken));
  }, [dispatch, userId.accessToken]);

  if (isLoading) {
    return <p>Loading reservations...</p>;
  }

  console.log(userId.accessToken);
  if (!reservations || reservations.length === 0) {
    return <p>No reservations found.</p>;
  }

  return (
    <div>
      <h2>Your Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReservations;
