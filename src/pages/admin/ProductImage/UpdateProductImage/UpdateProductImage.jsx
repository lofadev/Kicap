import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputFile from '~/components/FormGroup/InputFile/InputFile';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProductImageService from '~/services/ProductImageService';
import ProductService from '~/services/ProductService';
import { updateProductImageSchema } from '~/validate/YupSchema';

const UpdateProductImage = () => {
  const { id } = useParams();
  const location = useLocation();
  const productID = location.state;
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState('');
  const formik = useFormik({
    initialValues: {
      image: '',
      description: '',
      displayOrder: 0,
      isHidden: false,
    },
    validationSchema: updateProductImageSchema,
    onSubmit: async (payload, actions) => {
      const res = await ProductImageService.updateProductImage(id, payload, dispatch);
      if (res.status === 'OK') {
        const data = res.data;
        if (data.displayOrder === 1) {
          await ProductService.updateProductMoreImage(
            productID,
            { more_image: data.image },
            dispatch
          );
        }
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await ProductImageService.getProductImage(id, dispatch);
      if (res.status === 'OK') {
        const productImage = res.data;
        formik.setValues({
          description: productImage.description,
          displayOrder: productImage.displayOrder,
          isHidden: productImage.isHidden,
        });
        setImageURL(productImage.image);
      }
      setImageURL;
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung ảnh của sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin ảnh'>
        <form>
          <InputFile labelName='Ảnh' name='image' required formik={formik} imageURL={imageURL} />
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
            to={`/admin/product/update/${productID}`}
            handleSave={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      </Box>
    </div>
  );
};

export default UpdateProductImage;
