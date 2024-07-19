import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {render, screen, userEvent} from '@testing-library/react-native';
import {ProductCardComponent} from '@components/ProductCardComponent';
import {ProductModel} from '@models/product';

const fakeProduct: ProductModel.Response.GetAll.Datum = {
  id: 'trj-crd',
  name: 'Visa Titanium',
  description: 'Tarjeta de consumo bajo modalidad credito.',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: '2024-07-14T05:00:00.000+00:00',
  date_revision: '2025-07-15T05:00:00.000+00:00',
};

describe('ProductCardComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(<ProductCardComponent product={fakeProduct} onPress={() => {}} />);
  });

  it('show product information', () => {
    render(<ProductCardComponent product={fakeProduct} onPress={() => {}} />);
    expect(screen.getByText(fakeProduct.name)).toBeTruthy();
    expect(screen.getByText(`ID: ${fakeProduct.id}`)).toBeTruthy();
  });

  it('show skeleton when isLoading is true', () => {
    render(
      <ProductCardComponent
        product={fakeProduct}
        onPress={() => {}}
        isLoading
      />,
    );

    expect(screen.queryByText(fakeProduct.name)).not.toBeOnTheScreen();
    expect(screen.queryByText(`ID: ${fakeProduct.id}`)).not.toBeOnTheScreen();
  });

  it('call onPress when card is pressed', async () => {
    const onPress = jest.fn();
    render(<ProductCardComponent product={fakeProduct} onPress={onPress} />);
    const card = screen.getByText(fakeProduct.name);
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(card);
    expect(onPress).toHaveBeenCalled();
  });

  it('not call onPress when card is pressed and isLoading is true', async () => {
    const onPress = jest.fn();

    render(
      <ProductCardComponent
        product={fakeProduct}
        onPress={onPress}
        isLoading
      />,
    );

    const card = screen.getByTestId('product-card');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(card);
    expect(onPress).not.toHaveBeenCalled();
  });
});
