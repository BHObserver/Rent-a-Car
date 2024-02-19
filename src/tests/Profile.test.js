import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Profile from '../components/Profile';

const mockStore = configureStore([]);

describe('Profile component', () => {
  test('renders correctly', () => {
    // Mock the Redux state
    const initialState = {
      car: {
        cars: [], // Mock the cars array or provide sample data if needed
        loading: false,
        error: null,
      },
      // Add other slices of state if needed
    };

    // Create a mock store instance
    const store = mockStore(initialState);

    const tree = renderer.create(
      <Provider store={store}>
        <Profile />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
