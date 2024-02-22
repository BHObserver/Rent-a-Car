import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CarReservationForm from '../components/reservation/CarReservationForm';

// Mocking useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CarReservationForm component', () => {
  it('renders correctly', () => {
    // Mocking useDispatch and useSelector hooks
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({
      auth: { user: { accessToken: 'mockAccessToken' } },
      car: { cars: { cars: [] } },
    });

    const component = renderer.create(
      <Router>
        {' '}
        {/* Wrap CarReservationForm with BrowserRouter */}
        <CarReservationForm />
      </Router>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
