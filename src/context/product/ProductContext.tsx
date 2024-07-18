import {createContext} from 'react';
import {ProductModel} from '@models/product';

export interface IProductState {
  products: ProductModel.Response.GetAll.Datum[];
  isProductsLoading: boolean;
  searchProducts: (searchText: string) => void;
  fetchProducts: () => void;
}

export const ProductContext = createContext<IProductState>({
  products: [],
  isProductsLoading: false,
  searchProducts: () => {},
  fetchProducts: () => {},
});
