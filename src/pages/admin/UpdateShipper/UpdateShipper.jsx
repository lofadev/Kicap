import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';
import ShipperService from '~/services/ShipperService';
import { validatedEmpty, validatedPhoneNumber } from '~/utils';

const UpdateShipper = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const res = await ShipperService.getShipper(id, user.accessToken);
        dispatch(setLoading(false));
        setFormData({
          name: res.data.name,
          phone: res.data.phone,
        });
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(
          updateToast({
            status: 'error',
            message: error.response.data.message,
          })
        );
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeInput = (e) => {
    let error;
    if (e.target.name === 'name') error = validatedEmpty(e.target.value);
    else if (e.target.name === 'phone') error = validatedPhoneNumber(e.target.value);
    setFormErrors({ ...formErrors, [e.target.name]: error });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidate = () => {
    const errorName = validatedEmpty(formData.name);
    const errorPhone = validatedPhoneNumber(formData.phone);
    setFormErrors({
      name: errorName ?? '',
      phone: errorPhone ?? '',
    });
    if (errorName || errorPhone) return false;
    return true;
  };

  const handleSave = async () => {
    const validated = handleValidate();
    if (validated) {
      dispatch(setLoading(true));
      const payload = {
        name: formData.name,
        phone: formData.phone,
      };
      const response = await ShipperService.updateShipper(id, payload, user.accessToken);
      dispatch(setLoading(false));
      dispatch(
        updateToast({
          status: 'ok',
          message: response.message,
        })
      );
    }
  };

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin người giao hàng</HeadingBreadCrumb>

      <Box>
        <FormGroup
          labelName='Tên người giao hàng'
          placeholder='Nhập tên người giao hàng'
          required
          type='input'
          autoFocus
          name='name'
          valueInput={formData.name}
          handleOnChange={handleOnChangeInput}
          error={formErrors.name}
        ></FormGroup>
        <FormGroup
          labelName='Số điện thoại'
          placeholder='Nhập số điện thoại người giao hàng'
          required
          type='input'
          name='phone'
          valueInput={formData.phone}
          handleOnChange={handleOnChangeInput}
          error={formErrors.phone}
        ></FormGroup>

        <ButtonAction to='/admin/shippers' handleSave={handleSave} />
      </Box>
    </div>
  );
};

export default UpdateShipper;
