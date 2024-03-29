import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import './AddProduct.scss';
import FormGroup from '~/components/FormGroup/FormGroup';

const AddProduct = () => {
  return (
    <div className='product-add'>
      <HeadingBreadCrumb>Thêm sản phẩm</HeadingBreadCrumb>
      <div className='product-content'>
        <FormGroup
          labelName='Tên sản phẩm'
          required
          placeholder='Nhập tên sản phẩm...'
          type='input'
          labelFor='productName'
        ></FormGroup>
        <FormGroup
          labelName='Tên sản phẩm'
          required
          placeholder='Nhập tên sản phẩm...'
          type='input'
          labelFor='productName'
        ></FormGroup>
        <FormGroup
          labelName='Tên sản phẩm'
          required
          placeholder='Nhập tên sản phẩm...'
          type='input'
          labelFor='productName'
        ></FormGroup>
        <FormGroup
          labelName='Tên sản phẩm'
          required
          placeholder='Nhập tên sản phẩm...'
          type='input'
          labelFor='productName'
        ></FormGroup>
      </div>
    </div>
  );
};

export default AddProduct;
