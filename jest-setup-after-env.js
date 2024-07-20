import {jest} from '@jest/globals';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@gorhom/bottom-sheet', () => {
  const reactNative = jest.requireActual('react-native');
  const React = require('react');
  const {View} = reactNative;

  class Modal extends React.Component {
    present = jest.fn();

    dismiss = jest.fn();

    render() {
      return React.createElement('View', this.props, this.props.children);
    }
  }

  return {
    __esModule: true,
    default: View,
    BottomSheetModal: Modal,
    BottomSheetView: View,
    BottomSheetModalProvider: View,
    useBottomSheetModal: () => ({
      present: () => {},
      dismiss: () => {},
    }),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-date-picker', () => {
  const React = require('react');

  class DatePicker extends React.Component {
    render() {
      return React.createElement('View', this.props, this.props.children);
    }
  }

  return {
    __esModule: true,
    default: DatePicker,
  };
});
