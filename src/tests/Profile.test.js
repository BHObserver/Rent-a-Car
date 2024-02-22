import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
        cars: [],
        loading: false,
        error: null,
      },
    };

    // Create a mock store instance
    const store = mockStore(initialState);

    const tree = renderer.create(
      <Router>
        {' '}
        {/* Wrap Profile with BrowserRouter */}
        <Provider store={store}>
          <Profile />
        </Provider>
      </Router>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
