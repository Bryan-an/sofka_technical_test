import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

interface Props extends React.PropsWithChildren {
  onPress?: TouchableOpacityProps['onPress'];
  text: string;
  backgroundColor?: string;
  textColor?: string;
  isLoading?: boolean;
}

export const FilledButtonComponent: React.FC<Props> = ({
  onPress,
  text,
  children,
  backgroundColor = 'gold',
  textColor = 'darkslategrey',
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[styles.button, {backgroundColor}]}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
          testID="filled-button-loading-indicator"
        />
      ) : (
        children
      )}
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
    flexDirection: 'row',
  },
  text: {
    color: 'darkslategrey',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
