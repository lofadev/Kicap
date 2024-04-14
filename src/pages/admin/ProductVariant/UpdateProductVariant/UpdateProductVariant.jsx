import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import AttributeService from '~/services/AttributeService';
import ProductVariantService from '~/services/ProductVariantService';
import { addProductVariantSchema } from '~/validate/YupSchema';

const UpdateProductVariant = () => {
  const { id } = useParams();
  const location = useLocation();
  const productID = location.state;
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      value: '',
      price: 0,
      displayOrder: 0,
      toImageOrder: 0,
    },
    validationSchema: addProductVariantSchema,
    onSubmit: async (payload) => {
      payload.productID = productID;
      await ProductVariantService.updateProductVariant(id, payload, dispatch);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [attributeRes, variantRes] = await Promise.all([
        AttributeService.getAttributes({}, dispatch),
        ProductVariantService.getProductVariant(id, dispatch),
      ]);
      if (attributeRes.status === 'OK') {
        const attributes = attributeRes.data.map((att) => {
          return {
            id: att._id,
            name: att.name,
          };
        });
        setOptions(attributes);
      }
      if (variantRes.status === 'OK') {
        const variant = variantRes.data;
        formik.setValues({
          name: variant.name,
          value: variant.value,
          price: variant.price,
          stock: variant.stock,
          discount: variant.discount,
          displayOrder: variant.displayOrder,
          toImageOrder: variant.toImageOrder,
        });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin biến thể của sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin biến thể của sản phẩm'>
        <form>
          <SelectOptions
            labelName='Tên thuộc tính'
            required
            options={options}
            optionDefault={'--- Chọn thuộc tính ---'}
            name='name'
            formik={formik}
            value='name'
          />
          <Input
            labelName='Giá trị thuộc tính'
            placeholder='Nhập giá trị thuộc tính'
            name='value'
            required
            formik={formik}
          />
          <InputNumber
            labelName='Giá'
            placeholder='Nhập giá'
            required
            name='price'
            formik={formik}
            min={0}
            isPrice
          />
          <InputNumber
            labelName='Giá'
            placeholder='Tồn kho'
            required
            name='stock'
            formik={formik}
            min={0}
          />
          <InputNumber
            labelName='Giảm giá (%)'
            placeholder='Nhập giá trị giảm giá'
            required
            name='discount'
            formik={formik}
            min={0}
            isPrice
          />
          <InputNumber labelName='Thứ tự hiển thị' name='displayOrder' formik={formik} min={0} />
          <InputNumber
            labelName='Đi đến thứ tự hình ảnh'
            name='toImageOrder'
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

export default UpdateProductVariant;
