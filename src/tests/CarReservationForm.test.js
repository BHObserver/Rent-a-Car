import React from 'react';
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CarReservationForm from '../components/reservation/CarReservationForm';
// Mocking useDispatch hook
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

    const component = renderer.create(<CarReservationForm />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
