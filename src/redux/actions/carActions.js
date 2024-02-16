// carActions.js
import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
} from './carActionTypes';

const fetchCars = () => async (dispatch) => {
  dispatch({ type: FETCH_CARS_REQUEST });
  try {
    const response = await fetch('http://localhost:3000/api/v1/cars');
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json(); // Parse JSON response
    dispatch({ type: FETCH_CARS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CARS_FAILURE, payload: error.message });
  }
};

export default fetchCars;
