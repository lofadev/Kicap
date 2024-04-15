import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import ProductImageService from '~/services/ProductImageService';
import ProductService from '~/services/ProductService';
import { addProductImageSchema } from '~/validate/YupSchema';

const AddProductImage = () => {
  const location = useLocation();
  const productID = location.state;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productID: productID,
      image: '',
      description: '',
      displayOrder: 0,
    },
    validationSchema: addProductImageSchema,
    onSubmit: async (payload, { setFieldValue, resetForm, setSubmitting }) => {
      const res = await ProductImageService.createProductImage(payload, dispatch);
      if (res.status === 'OK') {
        resetForm();
        setSubmitting(false);
        setFieldValue('image', '');
        fetchData();
        const data = res.data;
        if (data.displayOrder === 1) {
          const res = await ProductService.updateProduct(
            productID,
            { more_image: data.image },
            dispatch
          );
        }
      }
    },
  });

  const fetchData = async () => {
    const res = await ProductImageService.getMaxOrder(productID, dispatch);
    if (res.status === 'OK') {
      formik.setFieldValue('displayOrder', res.data + 1);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            name='displayOrder'
            formik={formik}
            min={0}
          />

          <ButtonAction
            to={`/admin/product/update/${productID}`}
            handleSave={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </div>
  );
};

export default AddProductImage;
