// In your reducer file (reservationReducer.js or wherever your reducers are defined)

const initialState = {
  userReservations: [], // Initialize userReservations as an empty array
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
      // Other cases for reservation creation success, failure, etc.
    default:
      return state;
  }
};

export default reservationReducer;
