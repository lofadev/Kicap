import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SelectOptions from '~/components/Select/Select';
import ShipperService from '~/services/ShipperService';
import { addProductImageSchema } from '~/validate/YupSchema';

const AddProductImage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location);
  const formik = useFormik({
    initialValues: {
      image: '',
      description: '',
      displayOrder: 0,
      isHidden: false,
    },
    validationSchema: addProductImageSchema,
    onSubmit: async (payload, actions) => {
      await ShipperService.createShipper(payload, dispatch);
      actions.resetForm();
    },
  });

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung ảnh của sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin ảnh'>
        <form>
          <InputFile labelName='Ảnh' name='image' required formik={formik} />
          <Input labelName='Mô tả' placeholder='Nhập mô tả' name='description' formik={formik} />
          <InputNumber
            labelName='Thứ tự hiển thị'
            placeholder='Nhập số điện thoại ảnh'
            required
            name='displayOrder'
            formik={formik}
            min={0}
          />
          <SelectOptions
            labelName='Ẩn ảnh'
            required
            options={[
              {
                id: 1,
                name: 'Không',
                value: false,
              },
              {
                id: 2,
                name: 'Có',
                value: true,
              },
            ]}
            name='isHidden'
            formik={formik}
            value='value'
          />

          <ButtonAction
            to='/admin/product/'
            handleSave={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </div>
  );
};

export default AddProductImage;
