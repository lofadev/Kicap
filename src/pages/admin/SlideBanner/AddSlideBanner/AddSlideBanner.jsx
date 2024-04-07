import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SliderService from '~/services/SliderService';
import { addSlideSchema } from '~/validate/YupSchema';

const AddSlideBanner = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image: '',
      description: '',
      displayOrder: 0,
      toProduct: '',
    },
    validationSchema: addSlideSchema,
    onSubmit: async (payload, { setFieldValue, resetForm, setSubmitting }) => {
      const res = await SliderService.createSlider(payload, dispatch);
      if (res.status === 'OK') {
        resetForm();
        setSubmitting(false);
        setFieldValue('image', '');
      }
    },
  });

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung slide banner</HeadingBreadCrumb>

      <Box title='Thông tin slide banner'>
        <form>
          <InputFile labelName='Ảnh' name='image' required formik={formik} />
          <Input labelName='Mô tả' placeholder='Nhập mô tả' name='description' formik={formik} />
          <InputNumber
            labelName='Thứ tự hiển thị'
            placeholder='Nhập số điện thoại ảnh'
            name='displayOrder'
            formik={formik}
            min={0}
          />

          <ButtonAction
            to={'/admin/slides'}
            handleSave={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </div>
  );
};

export default AddSlideBanner;
