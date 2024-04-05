import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import ShipperService from '~/services/ShipperService';
import { shipperSchema } from '~/validate/YupSchema';

const AddShipper = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: shipperSchema,
    onSubmit: async (payload, actions) => {
      await ShipperService.createShipper(payload, dispatch);
      actions.resetForm();
    },
  });

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung người giao hàng</HeadingBreadCrumb>

      <Box title='Thông tin người giao hàng'>
        <form>
          <Input
            labelName='Tên người giao hàng'
            placeholder='Nhập tên người giao hàng'
            required
            name='name'
            formik={formik}
          />
          <Input
            labelName='Số điện thoại'
            placeholder='Nhập số điện thoại người giao hàng'
            required
            name='phone'
            formik={formik}
          />

          <ButtonAction
            to='/admin/shippers'
            handleSave={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </div>
  );
};

export default AddShipper;
