import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import {DetailsScreen} from '@screens/DetailsScreen';
import {ProductModel} from '@models/product';
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '@config/axios';

const fakeProduct: ProductModel.Response.GetAll.Datum = {
  id: 'trj-crd',
  name: 'Visa Titanium',
  description: 'Tarjeta de consumo bajo modalidad credito.',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: '2024-07-14T05:00:00.000+00:00',
  date_revision: '2025-07-15T05:00:00.000+00:00',
};

describe('DetailsScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
  });

  it('should show product ID', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    expect(screen.getByText(`ID: ${fakeProduct.id}`)).toBeOnTheScreen();
  });

  it('should show product name', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    expect(screen.getByText(`Nombre: ${fakeProduct.name}`)).toBeOnTheScreen();
  });

  it('should show product description', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);

    expect(
      screen.getByText(`Descripción: ${fakeProduct.description}`),
    ).toBeOnTheScreen();
  });

  it('should show product release date', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);

    expect(
      screen.getByText(`Fecha de liberación: ${fakeProduct.date_release}`),
    ).toBeOnTheScreen();
  });

  it('should show product revision date', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);

    expect(
      screen.getByText(`Fecha de revisión: ${fakeProduct.date_revision}`),
    ).toBeOnTheScreen();
  });

  it('should show product logo', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    expect(screen.getByTestId('product-logo')).toBeOnTheScreen();
  });

  it('should render Edit button', () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    expect(screen.getByText('Editar')).toBeOnTheScreen();
  });

  it('should navigate to Form screen when Edit button is pressed', async () => {
    const navigation = {push: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    const button = screen.getByText('Editar');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);

    expect(navigation.push).toHaveBeenCalledWith('Form', {
      product: fakeProduct,
    });
  });

  it('should render Delete button', () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    expect(screen.getByText('Eliminar')).toBeOnTheScreen();
  });

  it('should show a confirmation modal when Delete button is pressed', async () => {
    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;
    render(<DetailsScreen navigation={navigation} route={route} />);
    const button = screen.getByText('Eliminar');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);

    expect(
      screen.getByText(
        `¿Estás seguro de eliminar el producto ${fakeProduct.name}?`,
      ),
    ).toBeOnTheScreen();

    expect(screen.getByText('Confirmar')).toBeOnTheScreen();
    expect(screen.getByText('Cancelar')).toBeOnTheScreen();
  });

  it('should delete the product when Confirm button is pressed', async () => {
    const mock = new MockAdapter(axiosInstance, {delayResponse: 0});
    mock.onDelete('').reply(200, 'Producto eliminado');

    const navigation = {popToTop: jest.fn()} as any;
    const route = {params: {product: fakeProduct}} as any;

    render(<DetailsScreen navigation={navigation} route={route} />);

    const button = screen.getByText('Eliminar');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);

    const confirmButton = screen.getByText('Confirmar');
    await user.press(confirmButton);

    await waitFor(() => {
      expect(navigation.popToTop).toHaveBeenCalled();
    });
  });
});
