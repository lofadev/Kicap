import { axiosJWT, handleAPICallWithoutToast } from '~/api/apiConfig';
import { getToken } from '~/utils/utils';

const getDashBoard = (dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/dashboard/get-count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    dispatch
  );
};

const getRevenue = (params, dispatch) => {
  const token = getToken();
  return handleAPICallWithoutToast(
    axiosJWT.get('/dashboard/get-revenue', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }),
    dispatch
  );
};

const DashboardService = { getDashBoard, getRevenue };
export default DashboardService;
