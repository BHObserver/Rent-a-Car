import {
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAILURE,
} from '../actions/reservationActionTypes';

const initialState = {
  userReservations: [],
  isLoading: false,
  error: null,
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_RESERVATIONS_SUCCESS':
      return {
        ...state,
        userReservations: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_USER_RESERVATIONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_RESERVATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReservations: state.userReservations.filter(
          (reservation) => reservation.id !== action.payload,
        ),
      };
    case DELETE_RESERVATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reservationReducer;
