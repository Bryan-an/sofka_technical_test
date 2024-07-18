import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import {type ProductModel} from '@models/product';
import Icon from 'react-native-vector-icons/FontAwesome';
import Skeleton from 'react-native-reanimated-skeleton';

interface Props {
  product: ProductModel.Response.GetAll.Datum;
  onPress: TouchableOpacityProps['onPress'];
  isLoading?: boolean;
}

export const ProductCardComponent: React.FC<Props> = ({
  product,
  onPress,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      testID="product-card">
      <View style={styles.mainContainer}>
        <View style={styles.dataContainer}>
          {isLoading ? (
            <Skeleton
              isLoading={isLoading}
              containerStyle={{flex: 1, height: 20}}>
              <Text style={{width: 225, height: 20}}>{product.name}</Text>
            </Skeleton>
          ) : (
            <Text style={styles.nameText}>{product.name}</Text>
          )}
          {isLoading ? (
            <Skeleton
              isLoading={isLoading}
              containerStyle={{flex: 1, height: 20}}>
              <Text style={{width: 100, height: 20}}>{product.name}</Text>
            </Skeleton>
          ) : (
            <Text>ID: {product.id}</Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="chevron-right"
            size={20}
            color="darkslategrey"
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 14,
    gap: 5,
    flexDirection: 'row',
  },
  dataContainer: {
    flex: 1,
    gap: 4,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
  iconContainer: {
    justifyContent: 'center',
  },
  icon: {
    opacity: 0.4,
  },
  skeleton: {
    flex: 1,
    width: '100%',
    height: 80,
  },
});
