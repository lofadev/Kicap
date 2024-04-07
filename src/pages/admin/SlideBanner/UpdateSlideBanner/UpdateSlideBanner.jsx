import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SliderService from '~/services/SliderService';
import { updateSlideSchema } from '~/validate/YupSchema';

const UpdateSlideBanner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState('');
  const formik = useFormik({
    initialValues: {
      image: '',
      description: '',
      displayOrder: 0,
      toProduct: '',
    },
    validationSchema: updateSlideSchema,
    onSubmit: async (payload, { setFieldValue, resetForm, setSubmitting }) => {
      const res = await SliderService.updateSlider(id, payload, dispatch);
      if (res.status === 'OK') {
        resetForm();
        setSubmitting(false);
        setFieldValue('image', '');
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await SliderService.getSlider(id, dispatch);
      if (res.status === 'OK') {
        const slider = res.data;
        formik.setValues({
          description: slider.description,
          displayOrder: slider.displayOrder,
          toProduct: slider.toProduct,
        });
        setImageURL(slider.image);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin slide banner</HeadingBreadCrumb>

      <Box title='Thông tin slide banner'>
        <form>
          <InputFile labelName='Ảnh' name='image' required formik={formik} imageURL={imageURL} />
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

export default UpdateSlideBanner;
