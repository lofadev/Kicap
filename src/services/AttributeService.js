import { axiosJWT, handleAPICall, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils';

const createAttribute = (data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.post('/attribute/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getAttribute = (id, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get(`/attribute/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getAttributes = (payload, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/attribute/get-all', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );
};

const updateAttribute = (id, data, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.put(`/attribute/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const deleteAttribute = (id, dispatch) => {
  const token = getToken();
  return handleAPICall(
    axiosJWT.delete(`/attribute/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const AttributeService = {
  createAttribute,
  updateAttribute,
  getAttribute,
  getAttributes,
  deleteAttribute,
};

export default AttributeService;
