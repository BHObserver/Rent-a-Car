import React from 'react';
import renderer from 'react-test-renderer';
import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Logout from '../components/sessions/Logout';

// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Logout component', () => {
  it('renders correctly', () => {
    const dispatch = jest.fn(); // Mock dispatch function
    useDispatch.mockReturnValue(dispatch);

    const component = renderer.create(
      <MemoryRouter>
        {' '}
        {/* Wrap Logout component in MemoryRouter */}
        <Logout />
      </MemoryRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
