import {Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ProductContext} from './ProductContext';
import {ProductModel} from '@models/product';
import {productService} from '@services/product';

const fakeProducts: ProductModel.Response.GetAll.Datum[] = [
  {
    id: 'trj-crd',
    name: 'Visa Titanium',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-07-14T05:00:00.000+00:00',
    date_revision: '2025-07-15T05:00:00.000+00:00',
  },
  {
    id: 'trj-crd2',
    name: 'Tarjeta de Credito2',
    description: 'Tarjeta de consumo bajo modalidad credito 2.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-crd3',
    name: 'Tarjeta de Credito3',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: 'trj-123',
    name: 'Tarjeta de Credito 3',
    description: 'Tarjeta de consumo bajo modalidad credito 3.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-07-04T00:00:00.000+00:00',
    date_revision: '2025-07-04T00:00:00.000+00:00',
  },
  {
    id: '225544',
    name: 'PruebaPostman',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
  {
    id: '2255441',
    name: 'PruebaPostman2',
    description: 'Tarjeta de consumo bajo modalidad credito.',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2023-02-01T00:00:00.000+00:00',
  },
];

type Props = React.PropsWithChildren<{}>;

export const ProductProvider: React.FC<Props> = ({children}) => {
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);

  const [products, setProducts] =
    useState<ProductModel.Response.GetAll.Datum[]>(fakeProducts);

  const allProducts = useRef<ProductModel.Response.GetAll.Datum[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsProductsLoading(true);

    productService
      .getAll()
      .then(({data}) => {
        allProducts.current = data;
        setProducts(data);
      })
      .catch(error => {
        Alert.alert(
          'Error',
          error.message ?? 'Ocurrió un error al obtener los productos',
        );
      })
      .finally(() => setIsProductsLoading(false));
  };

  const searchProducts = (text: string) => {
    const filteredProducts = allProducts.current.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );

    setProducts(filteredProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isProductsLoading,
        searchProducts,
        fetchProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
