import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import SelectOptions from '~/components/Select/Select';
import { setLoading } from '~/redux/slides/LoadingSlider';
import { updateToast } from '~/redux/slides/ToastSlide';
import SupplierService from '~/services/SupplierService';
import { validatedEmail, validatedEmpty, validatedPhoneNumber } from '~/utils';
import './UpdateSupplier.scss';
import { useParams } from 'react-router-dom';

const UpdateSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    province: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleOnChangeInput = (e) => {
    let error;
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'name') error = validatedEmpty(value);
    else if (name === 'contactName') error = validatedEmpty(value);
    else if (name === 'phone') error = validatedPhoneNumber(value);
    else if (name === 'email') error = validatedEmail(value);
    else if (name === 'address') error = validatedEmpty(value);
    setFormErrors({ ...formErrors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const handleValidate = () => {
    const errorName = validatedEmpty(formData.name);
    const errorContactName = validatedEmpty(formData.contactName);
    const errorPhone = validatedPhoneNumber(formData.phone);
    const errorEmail = validatedEmail(formData.email);
    const errorAddress = validatedEmpty(formData.address);
    const errorProvince = validatedEmpty(formData.province);
    setFormErrors({
      name: errorName ?? '',
      contactName: errorContactName ?? '',
      phone: errorPhone ?? '',
      email: errorEmail ?? '',
      address: errorAddress ?? '',
      province: errorProvince ?? '',
    });
    if (errorName || errorContactName || errorPhone || errorEmail || errorAddress || errorProvince)
      return false;
    return true;
  };

  const handleSave = async () => {
    const validated = handleValidate();
    if (validated) {
      try {
        const payload = {
          name: formData.name,
          contactName: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          province: formData.province,
        };
        dispatch(setLoading(true));
        const response = await SupplierService.updateSupplier(id, payload, user.accessToken);
        dispatch(setLoading(false));
        dispatch(
          updateToast({
            status: 'ok',
            message: response.message,
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        dispatch(
          updateToast({
            status: 'error',
            message: error.response.data.message,
          })
        );
      }
    }
  };

  const handleChangeProvince = (e) => {
    setFormData({ ...formData, province: e.target.value });
    // eslint-disable-next-line no-unused-vars
    const { province, ...newFormErrors } = formErrors;
    setFormErrors(newFormErrors);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const res = await SupplierService.getSupplier(id, user.accessToken);
        dispatch(setLoading(false));
        setFormData({
          name: res.data.name,
          contactName: res.data.contactName,
          phone: res.data.phone,
          email: res.data.email,
          address: res.data.address,
          province: res.data.province,
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

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung nhà cung cấp</HeadingBreadCrumb>

      <Box>
        <FormGroup
          labelName='Tên nhà cung cấp'
          placeholder='Nhập tên nhà cung cấp'
          required
          type='input'
          autoFocus
          name='name'
          valueInput={formData.name}
          handleOnChange={handleOnChangeInput}
          error={formErrors.name}
        ></FormGroup>
        <FormGroup
          labelName='Tên giao dịch'
          placeholder='Nhập tên giao dịch'
          required
          type='input'
          name='contactName'
          valueInput={formData.contactName}
          handleOnChange={handleOnChangeInput}
          error={formErrors.contactName}
        ></FormGroup>
        <FormGroup
          labelName='Số điện thoại'
          placeholder='Nhập số điện thoại nhà cung cấp'
          required
          type='input'
          name='phone'
          valueInput={formData.phone}
          handleOnChange={handleOnChangeInput}
          error={formErrors.phone}
        ></FormGroup>
        <FormGroup
          labelName='Email'
          placeholder='Nhập email nhà cung cấp'
          required
          type='input'
          name='email'
          valueInput={formData.email}
          handleOnChange={handleOnChangeInput}
          error={formErrors.email}
        ></FormGroup>
        <FormGroup
          labelName='Địa chỉ'
          placeholder='Nhập địa chỉ nhà cung cấp'
          required
          type='input'
          name='address'
          valueInput={formData.address}
          handleOnChange={handleOnChangeInput}
          error={formErrors.address}
        ></FormGroup>
        <FormGroup
          labelName='Tỉnh/thành'
          required
          type=''
          name='province'
          handleOnChange={handleOnChangeInput}
          error={formErrors.province}
        >
          <SelectOptions
            options={[
              {
                value: '1',
                name: '1',
              },
              {
                value: '2',
                name: '2',
              },
              {
                value: '3',
                name: '3',
              },
            ]}
            optionDefault='--- Chọn Tỉnh/thành ---'
            id='province'
            value={formData.province}
            handleOnChange={handleChangeProvince}
          ></SelectOptions>
        </FormGroup>

        <ButtonAction to='/admin/suppliers' handleSave={handleSave} />
      </Box>
    </div>
  );
};

export default UpdateSupplier;
