import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import store from '../redux/store';
import '@testing-library/jest-dom/extend-expect';
import CarForm from '../components/car/CreateCarForm';


describe('CarForm component', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <CarForm />
        </Provider>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  
    test('form submission', async () => {
      const { getByLabelText, getByText, findByText } = render(
        <Provider store={store}>
          <CarForm />
        </Provider>
      );
      const nameInput = getByLabelText('Name');
      const makeInput = getByLabelText('Make');
      const modelInput = getByLabelText('Model');
      const yearInput = getByLabelText('Year');
      const submitButton = getByText('Create Car');
  
      fireEvent.change(nameInput, { target: { value: 'Test Car' } });
      fireEvent.change(makeInput, { target: { value: 'Test Make' } });
      fireEvent.change(modelInput, { target: { value: 'Test Model' } });
      fireEvent.change(yearInput, { target: { value: '2022' } });
  
      fireEvent.click(submitButton);
  
      const successMessage = await findByText('Car created successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  