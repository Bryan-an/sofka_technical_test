import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/HomeStackNavigator';
import {productService} from '@services/product';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomSheetView, BottomSheetModal} from '@gorhom/bottom-sheet';
import {FilledButtonComponent} from '@components/FilledButtonComponent';
import {OutlinedButtonComponent} from '@components/OutlinedButtonComponent';
import {ProductContext} from 'context/product';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Details'> {}

export const DetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {fetchProducts} = useContext(ProductContext);

  const product = route.params.product;

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['50%'], []);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleDelete = () => {
    if (!product) {
      return;
    }

    bottomSheetModalRef.current?.dismiss();

    setIsDeleting(true);

    productService
      .remove(product.id)
      .then(({data}) => {
        Alert.alert('Éxito', data ?? 'Producto eliminado correctamente');
        fetchProducts();
        navigation.popToTop();
      })
      .catch(error => {
        Alert.alert(
          'Error',
          error.message ?? 'Ocurrió un error al eliminar el producto',
        );
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    product && (
      <View style={styles.screen}>
        <ScrollView style={styles.dataContainer}>
          <Image
            source={{uri: product.logo}}
            style={{width: 'auto', height: 200, resizeMode: 'contain'}}
          />
          <Text style={styles.idText}>ID: {product.id}</Text>
          <Text style={styles.subtitle}>Información adicional</Text>
          <Text style={styles.dataText}>
            <Text style={styles.keyText}>Nombre: </Text>
            {product.name}
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.keyText}>Descripción: </Text>
            {product.description}
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.keyText}>Fecha de liberación: </Text>
            {product.date_release}
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.keyText}>Fecha de revisión: </Text>
            {product.date_revision}
          </Text>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <FilledButtonComponent
            text="Editar"
            onPress={() => navigation.push('Form', {product: product})}>
            <Icon name="edit" size={18} color="darkslategrey" />
          </FilledButtonComponent>
          <OutlinedButtonComponent
            text="Eliminar"
            onPress={handlePresentModalPress}
            // onPress={handleDelete}
            isLoading={isDeleting}>
            <Icon name="trash" size={18} color="darkslategrey" />
          </OutlinedButtonComponent>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheetModal}>
          <BottomSheetView style={styles.sheetContentContainer}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'darkslategrey',
              }}>
              ¿Estás seguro de eliminar el producto {product.name}?
            </Text>

            <View style={styles.buttonsContainer}>
              <FilledButtonComponent text="Confirmar" onPress={handleDelete}>
                <Icon name="check" size={18} color="darkslategrey" />
              </FilledButtonComponent>

              <OutlinedButtonComponent
                text="Cancelar"
                onPress={() => bottomSheetModalRef.current?.dismiss()}>
                <Icon name="remove" size={18} color="darkslategrey" />
              </OutlinedButtonComponent>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 22,
    backgroundColor: 'white',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkslategrey',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: 'darkslategrey',
    marginTop: 16,
    marginBottom: 8,
  },
  dataText: {
    fontSize: 16,
    color: 'darkslategrey',
    marginTop: 4,
  },
  keyText: {
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
  dataContainer: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 24,
    gap: 12,
  },
  sheetContentContainer: {
    flex: 1,
    padding: 22,
  },
  bottomSheetModal: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
});
