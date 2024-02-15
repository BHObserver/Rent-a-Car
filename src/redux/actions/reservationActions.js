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

const createReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/reservations', { reservation: reservationData });
    // Dispatch action for successful reservation creation
    dispatch(reservationCreateSuccess(response.data));
  } catch (error) {
    // Dispatch action for reservation creation failure
    dispatch(reservationCreateFailure(error.response.data));
  }
};

export default createReservation;
