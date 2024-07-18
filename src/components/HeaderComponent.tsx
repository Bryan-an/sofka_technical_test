import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

interface Props extends React.PropsWithChildren {
  back:
    | {
        title: string;
      }
    | undefined;
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}

export const HeaderComponent = ({back, navigation}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, {paddingTop: insets.top}]}>
      {back && (
        <TouchableOpacity
          testID="header-back-button"
          onPress={navigation.goBack}
          style={[styles.backButton, {top: insets.top}]}>
          <Icon name="arrow-left" size={24} color="darkslategrey" />
        </TouchableOpacity>
      )}
      <Icon name="money" size={24} color="darkslategrey" />
      <Text style={styles.titleText}>BANCO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
});
