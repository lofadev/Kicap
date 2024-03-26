import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';
import ShipperService from '~/services/ShipperService';
import { validatedEmpty, validatedPhoneNumber } from '~/utils';

const AddShipper = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      const response = await ShipperService.createShipper(payload, user.accessToken);
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
      <HeadingBreadCrumb>Bổ sung người giao hàng</HeadingBreadCrumb>

      <Box>
        <FormGroup
          labelName='Tên người giao hàng'
          placeholder='Nhập tên người giao hàng'
          required
          type='input'
          autoFocus
          name='name'
          handleOnChange={handleOnChangeInput}
          error={formErrors.name}
        ></FormGroup>
        <FormGroup
          labelName='Số điện thoại'
          placeholder='Nhập số điện thoại người giao hàng'
          required
          type='input'
          name='phone'
          handleOnChange={handleOnChangeInput}
          error={formErrors.phone}
        ></FormGroup>

        <ButtonAction to='/admin/shippers' handleSave={handleSave} />
      </Box>
    </div>
  );
};

export default AddShipper;
