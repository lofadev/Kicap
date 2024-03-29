import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import CategoryService from '~/services/CategoryService';
import { validatedEmpty } from '~/utils';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleOnChangeInput = (e) => {
    let error;
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'categoryName') error = validatedEmpty(value);
    setFormErrors({ ...formErrors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const handleValidate = () => {
    const errorCategoryName = validatedEmpty(formData.categoryName);
    setFormErrors({
      categoryName: errorCategoryName ?? '',
    });
    if (errorCategoryName) return false;
    return true;
  };

  const handleSave = async () => {
    const validated = handleValidate();
    if (validated) {
      const payload = {
        categoryName: formData.categoryName,
        description: formData.description,
      };
      await CategoryService.createCategory(payload, user.accessToken, dispatch);
      setFormData({ categoryName: '', description: '' });
    }
  };

  return (
    <div>
      <HeadingBreadCrumb>Bổ sung danh mục sản phẩm</HeadingBreadCrumb>

      <Box>
        <FormGroup
          labelName='Tên danh mục sản phẩm'
          placeholder='Nhập tên danh mục sản phẩm'
          required
          type='input'
          autoFocus
          name='categoryName'
          value={formData.categoryName}
          handleOnChange={handleOnChangeInput}
          error={formErrors.categoryName}
        ></FormGroup>
        <FormGroup
          labelName='Mô tả'
          placeholder='Nhập mô tả danh mục sản phẩm'
          type='text'
          name='description'
          value={formData.description}
          handleOnChange={handleOnChangeInput}
          error={formErrors.description}
        ></FormGroup>

        <ButtonAction to='/admin/categorys' handleSave={handleSave} />
      </Box>
    </div>
  );
};

export default AddCategory;
