import {axiosInstance} from '@config/axios';
import {type ProductModel} from '@models/product';

const getAll = async () =>
  await axiosInstance.get<ProductModel.Response.GetAll>('');

const create = async (data: ProductModel.Request.Create) =>
  await axiosInstance.post<ProductModel.Response.Create>('', data);

const update = async (data: ProductModel.Request.Update) =>
  await axiosInstance.put<ProductModel.Response.Update>('', data);

const remove = async (id: string) =>
  await axiosInstance.delete<string>('', {params: {id}});

const verifyId = async (id: string) =>
  await axiosInstance.get<boolean>('/verification', {params: {id}});

export const productService = {
  getAll,
  create,
  update,
  remove,
  verifyId,
};
