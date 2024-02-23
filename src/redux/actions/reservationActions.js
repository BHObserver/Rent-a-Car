import axios from 'axios';
import * as actionTypes from './reservationActionTypes';

// Action creators for reservation creation success and failure
const reservationCreateSuccess = (reservation) => ({
  type: actionTypes.RESERVATION_CREATE_SUCCESS,
  payload: reservation,
});

const reservationCreateFailure = (error) => ({
  type: actionTypes.RESERVATION_CREATE_FAILURE,
  payload: error,
});

const fetchUserReservationsSuccess = (reservations) => ({
  type: actionTypes.FETCH_USER_RESERVATIONS_SUCCESS,
  payload: reservations,
});

const fetchUserReservationsFailure = (error) => ({
  type: actionTypes.FETCH_USER_RESERVATIONS_FAILURE,
  payload: error,
});

export const createReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/reservations', { reservation: reservationData });
    // Dispatch action for successful reservation creation
    localStorage.setItem('accessToken', response.data.id);
    dispatch(reservationCreateSuccess(response.data));
  } catch (error) {
    // Dispatch action for reservation creation failure
    dispatch(reservationCreateFailure(error));
  }
};

export const fetchUserReservations = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/reservations?user_id=${userId}`);
    // Dispatch action for successful fetch of user reservations
    dispatch(fetchUserReservationsSuccess(response.data));
  } catch (error) {
    // Dispatch action for failure to fetch user reservations
    dispatch(fetchUserReservationsFailure(error));
  }
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_RESERVATION_REQUEST });
  try {
    const response = await fetch(`http://localhost:3000/api/v1/reservations/${reservationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
    dispatch({ type: actionTypes.DELETE_RESERVATION_SUCCESS, payload: reservationId });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_RESERVATION_FAILURE, payload: error.message });
  }
};
