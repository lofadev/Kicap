import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Input from '~/components/FormGroup/Input/Input';
import CategoryService from '~/services/CategoryService';
import { categorySchema } from '~/validate/YupSchema';

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      categoryName: '',
      description: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (payload, { setSubmitting }) => {
      await CategoryService.updateCategory(id, payload, dispatch);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await CategoryService.getCategory(id, dispatch);
      formik.setValues({
        categoryName: res.data.categoryName,
        description: res.data.description,
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeadingBreadCrumb>Cập nhật thông tin danh mục sản phẩm</HeadingBreadCrumb>

      <Box title='Thông tin danh mục sản phẩm'>
        <form>
          <Input
            labelName='Tên danh mục sản phẩm'
            placeholder='Nhập tên danh mục sản phẩm'
            required
            name='categoryName'
            formik={formik}
          />
          <Input
            labelName='Mô tả'
            placeholder='Nhập mô tả danh mục sản phẩm'
            name='description'
            formik={formik}
            textarea
          />

          <ButtonAction to='/admin/categories' handleSave={formik.handleSubmit} />
        </form>
      </Box>
    </div>
  );
};

export default UpdateCategory;
