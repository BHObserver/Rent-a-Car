import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import UserReservations from '../components/reservation/UserReservations';

// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('UserReservations component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { accessToken: 'mockAccessToken' } },
      reservations: {
        userReservations: [], // Ensure it's initialized as an array
        isLoading: false,
      },
    });
  });

  it('renders correctly when there are no reservations', () => {
    useSelector.mockReturnValue([]); // Mock an empty array for userReservations
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <UserReservations />
        </Router>
      </Provider>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it('renders correctly when there are reservations', () => {
  //   // Mock an array of reservations
  //   useSelector.mockReturnValue([
  //     {
  //       id: 1,
  //       reserved_date: '2024-02-08',
  //       start_time: '10:00',
  //       end_time: '12:00',
  //       start_location: 'Location A',
  //       destination: 'Location B',
  //       total_cost: '$50',
  //     },
  //   ]);
  //   const component = renderer.create(
  //     <Provider store={store}>
  //       <Router>
  //         <UserReservations />
  //       </Router>
  //     </Provider>,
  //   );
  //   const tree = component.toJSON();

  //   expect(tree).toMatchSnapshot();
  // });
});
