import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/HomeStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProductCardComponent} from '@components/ProductCardComponent';
import {FilledButtonComponent} from '@components/FilledButtonComponent';
import {ProductContext} from 'context/product';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Home'> {}

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [timeoutToClear, setTimeoutToClear] = useState<NodeJS.Timeout>();

  const {isProductsLoading, products, searchProducts} =
    useContext(ProductContext);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClear);
    };
  }, []);

  const debounce = (
    callback: Function,
    alwaysCall: Function,
    delay: number,
  ) => {
    return (...args: any) => {
      alwaysCall(...args);
      clearTimeout(timeoutToClear);

      setTimeoutToClear(
        setTimeout(() => {
          callback(...args);
        }, delay),
      );
    };
  };

  const setSearchTextAlways = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = debounce(searchProducts, setSearchTextAlways, 300);

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Buscar..."
      />

      {products && (
        <Text style={styles.amountText}>
          {products.length}{' '}
          {products.length === 0 || products.length > 1
            ? 'resultados'
            : 'resultado'}
        </Text>
      )}

      {products ? (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={products}
          renderItem={({item}) => (
            <ProductCardComponent
              isLoading={isProductsLoading}
              product={item}
              onPress={() => navigation.push('Details', {product: item})}
            />
          )}
          style={styles.productList}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon
                name="exclamation-triangle"
                size={32}
                color="darkslategrey"
              />
              <Text style={styles.emptyText}>No se encontraron productos</Text>
            </View>
          )}
        />
      ) : null}

      <View style={styles.buttonContainer}>
        <FilledButtonComponent
          text="Agregar"
          onPress={() => navigation.push('Form')}>
          <Icon name="plus" size={18} color="darkslategrey" />
        </FilledButtonComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 22,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'darkslategrey',
    borderRadius: 8,
    padding: 8,
  },
  spinnerContainer: {
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    marginTop: 8,
    flex: 1,
  },
  listContentContainer: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
  listSeparator: {height: 1, backgroundColor: 'lightgrey'},
  buttonContainer: {
    marginTop: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: 'darkslategrey',
  },
  amountText: {
    marginTop: 24,
    color: 'darkslategrey',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
