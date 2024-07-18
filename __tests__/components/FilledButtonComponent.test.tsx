import React from 'react';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {render, screen, userEvent} from '@testing-library/react-native';
import {FilledButtonComponent} from '@components/FilledButtonComponent';
import {Text} from 'react-native';

describe('FilledButtonComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly', () => {
    render(<FilledButtonComponent text="My Button" />);
  });

  it('renders correctly with a text', () => {
    render(<FilledButtonComponent text="My Button" />);
    expect(screen.getByText('My Button')).toBeOnTheScreen();
  });

  it('call onPress when button is pressed', async () => {
    const onPress = jest.fn();
    render(<FilledButtonComponent text="My Button" onPress={onPress} />);
    const button = screen.getByText('My Button');
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    await user.press(button);
    expect(onPress).toHaveBeenCalled();
  });

  it('disables the button when isLoading is true', () => {
    render(<FilledButtonComponent text="My Button" isLoading />);
    expect(screen.getByText('My Button')).toBeDisabled();
  });

  it('enables the button when isLoading is false', () => {
    render(<FilledButtonComponent text="My Button" isLoading={false} />);
    expect(screen.getByText('My Button')).toBeEnabled();
  });

  it('renders a loading indicator when isLoading is true', async () => {
    render(<FilledButtonComponent text="My Button" isLoading />);
    expect(
      screen.getByTestId('filled-button-loading-indicator'),
    ).toBeOnTheScreen();
  });

  it('does not render a loading indicator when isLoading is false', async () => {
    render(<FilledButtonComponent text="My Button" isLoading={false} />);
    expect(
      screen.queryByTestId('filled-button-loading-indicator'),
    ).not.toBeOnTheScreen();
  });

  it('renders correctly with a custom background color', () => {
    render(<FilledButtonComponent text="My Button" backgroundColor="red" />);

    expect(screen.getByText('My Button').parent?.parent).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('renders correctly with a custom text color', () => {
    render(<FilledButtonComponent text="My Button" textColor="blue" />);

    expect(screen.getByText('My Button')).toHaveStyle({
      color: 'blue',
    });
  });

  it('renders correctly children', () => {
    render(
      <FilledButtonComponent text="My Button">
        <Text>My Text</Text>
      </FilledButtonComponent>,
    );

    expect(screen.getByText('My Text')).toBeOnTheScreen();
  });
});
