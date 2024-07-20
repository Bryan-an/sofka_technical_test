import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import {HomeScreen} from '@screens/HomeScreen';
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '@config/axios';
import {ProductModel} from '@models/product';
import {ProductProvider} from 'context/product';

const fakeProducts: ProductModel.Response.GetAll.Datum[] = [
  {
    id: 'trj-crd',
    name: 'Visa Titanium',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-07-14T05:00:00.000+00:00',
    date_revision: '2025-07-15T05:00:00.000+00:00',
  },
  {
    id: 'trj-crd2',
    name: 'Tarjeta de Credito2',
    description: 'Tarjeta de consumo bajo modalidad credito 2.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd3',
    name: 'Tarjeta de Credito3',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-123',
    name: 'Tarjeta de Credito 3',
    description: 'Tarjeta de consumo bajo modalidad credito 3.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-07-04T00:00:00.000+00:00',
    date_revision: '2025-07-04T00:00:00.000+00:00',
  },
  {
    id: '225544',
    name: 'PruebaPostman',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: '2255441',
    name: 'PruebaPostman2',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', async () => {
    const navigation = {
      navigate: jest.fn(),
    } as any;

    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />);
  });

  it('should list products', async () => {
    const mock = new MockAdapter(axiosInstance, {delayResponse: 0});
    mock.onGet('').reply(200, fakeProducts);

    const navigation = {
      navigate: jest.fn(),
    } as any;

    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />, {
      wrapper: ProductProvider,
    });

    for (const product of fakeProducts) {
      await waitFor(() => {
        expect(screen.getByText(product.name)).toBeOnTheScreen();
      });
    }
  });

  it('should show empty list message', async () => {
    const mock = new MockAdapter(axiosInstance, {delayResponse: 0});
    mock.onGet('').reply(200, []);

    const navigation = {
      navigate: jest.fn(),
    } as any;

    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />, {
      wrapper: ProductProvider,
    });

    await waitFor(() => {
      expect(screen.getByText('0 resultados')).toBeOnTheScreen();
    });

    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos')).toBeOnTheScreen();
    });
  });

  it('should navigate to Form screen when Add button is pressed', async () => {
    const navigation = {push: jest.fn()} as any;
    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />);

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const button = screen.getByText('Agregar');
    await user.press(button);

    expect(navigation.push).toHaveBeenCalledWith('Form');
  });

  it('should navigate to Details screen when product is pressed', async () => {
    const mock = new MockAdapter(axiosInstance, {delayResponse: 0});
    mock.onGet('').reply(200, fakeProducts);

    const navigation = {push: jest.fn()} as any;
    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />, {
      wrapper: ProductProvider,
    });

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const product = fakeProducts[0];
    await screen.findByText(product.name);
    const productElement = screen.getByText(product.name);
    await user.press(productElement);

    expect(navigation.push).toHaveBeenCalledWith('Details', {product});
  });

  it('should search products', async () => {
    const mock = new MockAdapter(axiosInstance, {delayResponse: 0});
    mock.onGet('').reply(200, fakeProducts);

    const navigation = {push: jest.fn()} as any;
    const route = {params: {}} as any;

    render(<HomeScreen navigation={navigation} route={route} />, {
      wrapper: ProductProvider,
    });

    await screen.findByText('6 resultados');

    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const searchInput = screen.getByPlaceholderText('Buscar...');
    await user.type(searchInput, 'Tarjeta de Credito');

    await waitFor(() => {
      expect(screen.getByText('3 resultados')).toBeOnTheScreen();
    });
  });
});
