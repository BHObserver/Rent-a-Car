import axios from 'axios';

// Action creators for reservation creation success and failure
const reservationCreateSuccess = (reservation) => ({
  type: 'RESERVATION_CREATE_SUCCESS',
  payload: reservation,
});

const reservationCreateFailure = (error) => ({
  type: 'RESERVATION_CREATE_FAILURE',
  payload: error,
});

const fetchUserReservationsSuccess = (reservations) => ({
  type: 'FETCH_USER_RESERVATIONS_SUCCESS',
  payload: reservations,
});

const fetchUserReservationsFailure = (error) => ({
  type: 'FETCH_USER_RESERVATIONS_FAILURE',
  payload: error,
});

export const createReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/reservations', { reservation: reservationData });
    // Dispatch action for successful reservation creation
    dispatch(reservationCreateSuccess(response.data));
  } catch (error) {
    // Dispatch action for reservation creation failure
    dispatch(reservationCreateFailure(error.response.data));
  }
};

export const fetchUserReservations = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/reservations?user_id=${userId}`);
    // Dispatch action for successful fetch of user reservations
    console.log(userId);
    console.log(response);
    dispatch(fetchUserReservationsSuccess(response.data));
  } catch (error) {
    // Dispatch action for failure to fetch user reservations
    dispatch(fetchUserReservationsFailure(error.response.data));
  }
};
