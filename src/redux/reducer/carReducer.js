// carReducer.js
import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
  FETCH_CAR_REQUEST,
  FETCH_CAR_SUCCESS,
  FETCH_CAR_FAILURE,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_FAILURE,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAILURE,
} from '../actions/carActionTypes';

const initialState = {
  cars: [],
  car: null,
  loading: false,
  error: '',
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARS_REQUEST:
    case FETCH_CAR_REQUEST:
    case CREATE_CAR_REQUEST:
    case DELETE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: action.payload,
        error: '',
      };
    case FETCH_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        car: action.payload,
        error: '',
      };
    case CREATE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: [...state.cars, action.payload],
        error: '',
      };
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: state.cars.filter((car) => car.id !== action.payload),
        error: '',
      };
    case FETCH_CARS_FAILURE:
    case FETCH_CAR_FAILURE:
    case CREATE_CAR_FAILURE:
    case DELETE_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default carReducer;
