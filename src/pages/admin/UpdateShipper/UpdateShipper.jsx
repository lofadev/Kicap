import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import ShipperService from '~/services/ShipperService';
import { shipperSchema } from '~/validate/YupSchema';

const UpdateShipper = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: shipperSchema,
    onSubmit: async (payload) => {
      await ShipperService.updateShipper(id, payload, user.accessToken, dispatch);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await ShipperService.getShipper(id, user.accessToken, dispatch);
      if (res.status === 'OK') {
        const shipper = res.data;
        formik.setValues({
          name: shipper.name,
          phone: shipper.phone,
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin người giao hàng</HeadingBreadCrumb>

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

export default UpdateShipper;
