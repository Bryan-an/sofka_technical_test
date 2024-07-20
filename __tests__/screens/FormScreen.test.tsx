import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {ProductModel} from '@models/product';
import {render, screen, userEvent} from '@testing-library/react-native';
import {FormScreen} from '@screens/FormScreen';

const fakeProduct: ProductModel.Response.GetAll.Datum = {
  id: 'trj-crd',
  name: 'Visa Titanium',
  description: 'Tarjeta de consumo bajo modalidad credito.',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: '2024-07-14T05:00:00.000+00:00',
  date_revision: '2025-07-15T05:00:00.000+00:00',
};

describe('FormScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', async () => {
    const navigation = {
      pop: jest.fn(),
      replace: jest.fn(),
      popToTop: jest.fn(),
    } as any;

    const route = {params: {product: fakeProduct}} as any;

    render(<FormScreen navigation={navigation} route={route} />);
  });

  it('should show product data when edit', async () => {
    const navigation = {
      pop: jest.fn(),
      replace: jest.fn(),
      popToTop: jest.fn(),
    } as any;

    const route = {params: {product: fakeProduct}} as any;

    render(<FormScreen navigation={navigation} route={route} />);

    expect(screen.getByText('Formulario de Edición')).toBeOnTheScreen();
    expect(screen.getByDisplayValue(fakeProduct.id)).toBeOnTheScreen();
  });

  it('should not show product data when create', async () => {
    const navigation = {
      pop: jest.fn(),
      replace: jest.fn(),
      popToTop: jest.fn(),
    } as any;

    const route = {params: {product: null}} as any;

    render(<FormScreen navigation={navigation} route={route} />);

    expect(screen.getByText('Formulario de Registro')).toBeOnTheScreen();
    expect(screen.queryByDisplayValue(fakeProduct.id)).not.toBeOnTheScreen();
  });

  it('should validate form', async () => {
    const navigation = {
      pop: jest.fn(),
      replace: jest.fn(),
      popToTop: jest.fn(),
    } as any;

    const route = {params: {product: null}} as any;

    render(<FormScreen navigation={navigation} route={route} />);

    const button = screen.getByText('Registrar');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);

    expect(screen.getAllByText('Este campo es obligatorio')).toHaveLength(4);
  });

  it('should reset form', async () => {
    const navigation = {
      pop: jest.fn(),
      replace: jest.fn(),
      popToTop: jest.fn(),
    } as any;

    const route = {params: {product: fakeProduct}} as any;

    render(<FormScreen navigation={navigation} route={route} />);

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const input = screen.getByDisplayValue(fakeProduct.name);
    await user.type(input, '123');

    expect(screen.queryByDisplayValue(fakeProduct.name)).not.toBeOnTheScreen();

    const button = screen.getByText('Resetear Formulario');
    await user.press(button);

    expect(screen.getByDisplayValue(fakeProduct.name)).toBeOnTheScreen();
  });
});
