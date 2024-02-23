import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useDispatch } from 'react-redux';
import Sidebar from '../components/navigation/Sidebar';
// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Sidebar component', () => {
  it('renders correctly', () => {
    // Mocking useDispatch hook
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = renderer.create(
      <Router>
        <Sidebar />
      </Router>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
