import { axiosInstance, axiosJWT, handleAPICall } from '~/api/apiConfig';

const registerUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-up', data), dispatch, true);

const loginUser = (data, dispatch) =>
  handleAPICall(axiosInstance.post('/user/sign-in', data), dispatch, true);

const logoutUser = (dispatch) => handleAPICall(axiosInstance.post('/user/sign-out'), dispatch);

const getDetailsUser = (id, token, dispatch) =>
  handleAPICall(
    axiosJWT.get(`/user/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    }),
    dispatch
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
  getDetailsUser,
  axiosJWT,
  refreshToken,
};

export default UserService;
