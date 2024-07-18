import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {render, screen, userEvent} from '@testing-library/react-native';
import {OutlinedButtonComponent} from '@components/OutlinedButtonComponent';
import {Text} from 'react-native';

describe('OutlinedButtonComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly', () => {
    render(<OutlinedButtonComponent text="My Button" />);
  });

  it('renders correctly with a text', () => {
    render(<OutlinedButtonComponent text="My Button" />);
    expect(screen.getByText('My Button')).toBeOnTheScreen();
  });

  it('call onPress when button is pressed', async () => {
    const onPress = jest.fn();
    render(<OutlinedButtonComponent text="My Button" onPress={onPress} />);
    const button = screen.getByText('My Button');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);
    expect(onPress).toHaveBeenCalled();
  });

  it('disables the button when isLoading is true', () => {
    render(<OutlinedButtonComponent text="My Button" isLoading />);
    expect(screen.getByText('My Button')).toBeDisabled();
  });

  it('enables the button when isLoading is false', () => {
    render(<OutlinedButtonComponent text="My Button" isLoading={false} />);
    expect(screen.getByText('My Button')).toBeEnabled();
  });

  it('renders a loading indicator when isLoading is true', async () => {
    render(<OutlinedButtonComponent text="My Button" isLoading />);
    expect(
      screen.getByTestId('outlined-button-loading-indicator'),
    ).toBeOnTheScreen();
  });

  it('does not render a loading indicator when isLoading is false', async () => {
    render(<OutlinedButtonComponent text="My Button" isLoading={false} />);
    expect(
      screen.queryByTestId('outlined-button-loading-indicator'),
    ).not.toBeOnTheScreen();
  });

  it('renders correctly children', () => {
    render(
      <OutlinedButtonComponent text="My Button">
        <Text>My Text</Text>
      </OutlinedButtonComponent>,
    );

    expect(screen.getByText('My Text')).toBeOnTheScreen();
  });
});
