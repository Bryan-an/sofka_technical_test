import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/HomeStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {productService} from '@services/product';
import {FilledButtonComponent} from '@components/FilledButtonComponent';
import {OutlinedButtonComponent} from '@components/OutlinedButtonComponent';
import {ProductContext} from '@context/product';
import {DateUtils} from '@utils/date';

interface Props extends NativeStackScreenProps<HomeStackParamList, 'Form'> {}

const validationSchema = Yup.object().shape({
  ID: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .max(10, 'Máximo 10 caracteres'),
  name: Yup.string()
    .required('Este campo es obligatorio')
    .min(5, 'Mínimo 5 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  description: Yup.string()
    .required('Este campo es obligatorio')
    .min(10, 'Mínimo 10 caracteres')
    .max(200, 'Máximo 200 caracteres'),
  logo: Yup.string().required('Este campo es obligatorio'),
  date_release: Yup.date()
    .required('Este campo es obligatorio')
    .min(
      new DateUtils().zeroDate,
      'La fecha de liberación debe ser mayor o igual a la fecha actual',
    ),
  date_revision: Yup.date()
    .required('Este campo es obligatorio')
    .when(['$date_release'], ([date_release], schema) =>
      schema.min(
        new DateUtils(date_release).plusYears(1).zeroDate,
        'La fecha de revisión debe ser exactamente un año posterior a la fecha de liberación',
      ),
    ),
});

export const FormScreen: React.FC<Props> = ({navigation, route}) => {
  const [isReleaseDatePickerOpen, setIsReleaseDatePickerOpen] =
    useState<boolean>(false);

  const [isRevisionDatePickerOpen, setIsRevisionDatePickerOpen] =
    useState<boolean>(false);

  const {fetchProducts} = useContext(ProductContext);

  const initialValues = useMemo(() => {
    const product = route.params?.product;
    console.log('here');

    if (product) {
      return {
        ID: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release: new DateUtils(product.date_release).zeroDate,
        date_revision: new DateUtils(product.date_revision).zeroDate,
      };
    } else {
      return {
        ID: '',
        name: '',
        description: '',
        logo: '',
        date_release: new DateUtils().zeroDate,
        date_revision: new DateUtils().plusYears(1).zeroDate,
      };
    }
  }, [route.params?.product]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (route.params?.product) {
            productService
              .update({
                id: values.ID,
                name: values.name,
                description: values.description,
                logo: values.logo,
                date_release: values.date_release.toISOString(),
                date_revision: values.date_revision.toISOString(),
              })
              .then(({data}) => {
                Alert.alert('Éxito', 'Producto actualizado exitosamente');
                fetchProducts();
                navigation.pop();
                navigation.replace('Details', {product: data});
              })
              .catch(error => {
                Alert.alert(
                  'Error',
                  error.message ?? 'Ocurrió un error al actualizar el producto',
                );
              })
              .finally(() => actions.setSubmitting(false));

            return;
          }

          productService.verifyId(values.ID).then(({data}) => {
            if (data) {
              Alert.alert('Error', 'El ID ingresado ya está en uso');
              actions.setFieldError('ID', 'Este ID ya está en uso');
              actions.setSubmitting(false);
            } else {
              productService
                .create({
                  id: values.ID,
                  name: values.name,
                  description: values.description,
                  logo: values.logo,
                  date_release: values.date_release.toISOString(),
                  date_revision: values.date_revision.toISOString(),
                })
                .then(() => {
                  Alert.alert('Éxito', 'Producto registrado exitosamente');
                  fetchProducts();
                  navigation.popToTop();
                })
                .catch(error => {
                  Alert.alert(
                    'Error',
                    error.message ??
                      'Ocurrió un error al registrar el producto',
                  );
                })
                .finally(() => actions.setSubmitting(false));
            }
          });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          setFieldValue,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <ScrollView style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>ID</Text>
                <TextInput
                  onChangeText={handleChange('ID')}
                  value={values.ID}
                  onBlur={handleBlur('ID')}
                  style={[
                    styles.input,
                    errors.ID && touched.ID
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}
                  placeholder="123ABC"
                  editable={!route.params?.product}
                />
                {errors.ID && touched.ID ? (
                  <Text style={styles.error}>{errors.ID}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  onBlur={handleBlur('name')}
                  style={[
                    styles.input,
                    errors.name && touched.name
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}
                  placeholder="123ABC"
                />
                {errors.name && touched.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  onChangeText={handleChange('description')}
                  value={values.description}
                  onBlur={handleBlur('description')}
                  style={[
                    styles.input,
                    errors.description && touched.description
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}
                  placeholder="123ABC"
                />
                {errors.description && touched.description ? (
                  <Text style={styles.error}>{errors.description}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Logo</Text>
                <TextInput
                  onChangeText={handleChange('logo')}
                  value={values.logo}
                  onBlur={handleBlur('logo')}
                  style={[
                    styles.input,
                    errors.logo && touched.logo
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}
                  placeholder="123ABC"
                />
                {errors.logo && touched.logo ? (
                  <Text style={styles.error}>{errors.logo}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de Liberación</Text>
                <TouchableOpacity
                  onPress={() => setIsReleaseDatePickerOpen(true)}
                  style={[
                    styles.input,
                    errors.date_release && touched.date_release
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}>
                  {values.date_release ? (
                    <Text>{values.date_release?.toLocaleDateString()}</Text>
                  ) : (
                    <Text style={styles.placeholder}>Seleccionar fecha</Text>
                  )}
                </TouchableOpacity>
                <DatePicker
                  locale="es-EC"
                  modal
                  open={isReleaseDatePickerOpen}
                  mode="date"
                  minimumDate={new DateUtils().zeroDate}
                  date={values.date_release}
                  onConfirm={date => {
                    setIsReleaseDatePickerOpen(false);
                    setFieldValue('date_release', new DateUtils(date).zeroDate);
                  }}
                  onCancel={() => setIsReleaseDatePickerOpen(false)}
                />
                {errors.date_release && touched.date_release ? (
                  <Text style={styles.error}>
                    {typeof errors.date_release === 'string'
                      ? errors.date_release
                      : 'Campo inválido'}
                  </Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de Revisión</Text>
                <TouchableOpacity
                  onPress={() => setIsRevisionDatePickerOpen(true)}
                  style={[
                    styles.input,
                    errors.date_revision && touched.date_revision
                      ? {borderColor: 'orangered'}
                      : undefined,
                  ]}>
                  {values.date_revision ? (
                    <Text>{values.date_revision?.toLocaleDateString()}</Text>
                  ) : (
                    <Text style={styles.placeholder}>Seleccionar fecha</Text>
                  )}
                </TouchableOpacity>
                <DatePicker
                  locale="es-EC"
                  modal
                  open={isRevisionDatePickerOpen}
                  mode="date"
                  minimumDate={
                    new DateUtils(values.date_release).plusYears(1).zeroDate
                  }
                  date={values.date_revision}
                  onConfirm={date => {
                    setIsRevisionDatePickerOpen(false);

                    setFieldValue(
                      'date_revision',
                      new DateUtils(date).zeroDate,
                    );
                  }}
                  onCancel={() => setIsRevisionDatePickerOpen(false)}
                />
                {errors.date_revision && touched.date_revision ? (
                  <Text style={styles.error}>
                    {typeof errors.date_revision === 'string'
                      ? errors.date_revision
                      : 'Campo inválido'}
                  </Text>
                ) : null}
              </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <FilledButtonComponent
                text={route.params?.product ? 'Actualizar' : 'Registrar'}
                onPress={() => handleSubmit()}
                isLoading={isSubmitting}>
                <Icon name="save" size={18} color="darkslategrey" />
              </FilledButtonComponent>

              <OutlinedButtonComponent
                text="Resetear Formulario"
                onPress={() => resetForm()}>
                <Icon name="refresh" size={18} color="darkslategrey" />
              </OutlinedButtonComponent>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 22,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkslategrey',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 24,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: 'darkslategrey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'darkslategrey',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  error: {
    color: 'orangered',
    fontSize: 14,
    marginTop: 4,
  },
  buttonsContainer: {
    marginTop: 16,
    gap: 12,
  },
  placeholder: {
    color: 'lightgrey',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
