import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderComponent} from '@components/HeaderComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeScreen} from '@screens/HomeScreen';
import {DetailsScreen} from '@screens/DetailsScreen';
import {FormScreen} from '@screens/FormScreen';
import {ProductModel} from '@models/product';

export type HomeStackParamList = {
  Home: undefined;
  Details: {product: ProductModel.Response.GetAll.Datum};
  Form?: {product: ProductModel.Response.GetAll.Datum};
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <HomeStack.Navigator
      screenOptions={{
        header: ({back, navigation}) => (
          <HeaderComponent back={back} navigation={navigation} />
        ),
        contentStyle: {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          backgroundColor: 'white',
        },
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Form" component={FormScreen} />
    </HomeStack.Navigator>
  );
};
