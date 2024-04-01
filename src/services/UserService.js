import { axiosInstance, axiosJWT, handleAPICall } from '~/api/apiConfig';

const registerUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-up', data), dispatch, true);

const loginUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-in', data), dispatch, true);

const logoutUser = (dispatch) => handleAPICall(axiosInstance.post('/user/sign-out'), dispatch);

const getDetailsUser = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const getUsers = (params, token, dispatch) =>
  handleAPICall(
    axiosJWT.get('/user/get-all', {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch
  );

const deleteUser = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.delete(`/user/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const updateUser = (id, payload, token, dispatch) =>
  handleAPICall(
    axiosJWT.put(`/user/update/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    dispatch,
    true
  );

const refreshToken = (refreshToken, dispatch) =>
  handleAPICall(
    axiosInstance.post(
      '/user/refresh-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    ),
    dispatch
  );

const UserService = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUsers,
  getDetailsUser,
  refreshToken,
};

export default UserService;
