import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlightProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface Props extends React.PropsWithChildren {
  onPress?: TouchableHighlightProps['onPress'];
  text: string;
  isLoading?: boolean;
}

export const OutlinedButtonComponent: React.FC<Props> = ({
  onPress,
  text,
  children,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="darkslategrey"
          testID="outlined-button-loading-indicator"
        />
      ) : (
        children
      )}
      <Text style={styles.text}>{text}</Text>
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
    borderWidth: 2,
    borderColor: 'darkslategrey',
  },
  text: {
    color: 'darkslategrey',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
