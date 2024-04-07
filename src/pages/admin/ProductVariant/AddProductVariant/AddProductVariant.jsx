import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import SelectOptions from '~/components/Select/Select';
import AttributeService from '~/services/AttributeService';
import ProductVariantService from '~/services/ProductVariantService';
import { addProductVariantSchema } from '~/validate/YupSchema';

const AddProductVariant = () => {
  const location = useLocation();
  const productID = location.state;
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      value: '',
      price: 0,
      displayOrder: 0,
      toImageOrder: 0,
    },
    validationSchema: addProductVariantSchema,
    onSubmit: async (payload, actions) => {
      payload.productID = productID;
      const res = await ProductVariantService.createProductVariant(payload, dispatch);
      if (res.status === 'OK') {
        actions.resetForm();
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await AttributeService.getAttributes({}, dispatch);
      if (res.status === 'OK') {
        const attributes = res.data;
        const newAttrbutes = attributes.map((att) => {
          return {
            id: att._id,
            name: att.name,
          };
        });
        setOptions(newAttrbutes);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung biến thể của sản phẩm</HeadingBreadCrumb>

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

export default AddProductVariant;
