// carActions.js
import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_FAILURE,
} from './carActionTypes';

export const fetchCars = () => async (dispatch) => {
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

export const createCar = (carData) => async (dispatch) => {
  dispatch({ type: CREATE_CAR_REQUEST });
  try {
    const response = await fetch('http://localhost:3000/api/v1/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ car: carData }),
    });
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    const data = await response.json(); // Parse JSON response
    dispatch({ type: CREATE_CAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CAR_FAILURE, payload: error.message });
  }
};
