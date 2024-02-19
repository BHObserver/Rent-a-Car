import React from 'react';
import renderer from 'react-test-renderer';
import { useDispatch } from 'react-redux';
import Logout from '../components/sessions/Logout';

// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Logout component', () => {
  it('renders correctly', () => {
    const dispatch = jest.fn(); // Mock dispatch function
    useDispatch.mockReturnValue(dispatch); // Mock useDispatch hook to return the mock dispatch function

    const component = renderer.create(<Logout />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
