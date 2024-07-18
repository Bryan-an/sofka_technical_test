import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {render, screen, userEvent} from '@testing-library/react-native';
import {HeaderComponent} from '@components/HeaderComponent';

describe('HeaderComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly', () => {
    render(<HeaderComponent navigation={{} as any} back={{title: ''}} />);
  });

  it('renders correctly with a back button', () => {
    render(<HeaderComponent navigation={{} as any} back={{title: ''}} />);
    expect(screen.getByTestId('header-back-button')).toBeOnTheScreen();
  });

  it('does not render a back button when back is undefined', () => {
    render(<HeaderComponent navigation={{} as any} back={undefined} />);
    expect(screen.queryByTestId('header-back-button')).not.toBeOnTheScreen();
  });

  it('calls navigation.goBack when back button is pressed', async () => {
    const navigation = {goBack: jest.fn()} as any;
    render(<HeaderComponent navigation={navigation} back={{title: ''}} />);
    const button = screen.getByTestId('header-back-button');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('renders correctly with a title', () => {
    render(<HeaderComponent navigation={{} as any} back={undefined} />);
    expect(screen.getByText('BANCO')).toBeOnTheScreen();
  });
});
