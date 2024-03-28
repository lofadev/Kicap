import { axiosJWT } from '~/api/apiConfig';

const getProvinces = async (params) => {
  const res = await axiosJWT.get('/province/get-all', { params });
  return res.data;
};

const getProvince = async (id) => {
  const res = await axiosJWT.get(`/province/${id}`);
  return res.data;
};

const ProvinceService = {
  getProvince,
  getProvinces,
};

export default ProvinceService;
