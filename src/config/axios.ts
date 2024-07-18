import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
  headers: {
    authorId: '1',
  },
});
