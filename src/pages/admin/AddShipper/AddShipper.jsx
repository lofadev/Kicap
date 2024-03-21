import Box from '~/components/Admin/Box/Box';
import ButtonAction from '~/components/Admin/ButtonAction/ButtonAction';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import FormGroup from '~/components/FormGroup/FormGroup';
import './AddShipper.scss';

const AddShipper = () => {
  return (
    <div>
      <HeadingBreadCrumb>Bổ sung người giao hàng</HeadingBreadCrumb>

      <Box>
        <FormGroup
          labelName='Tên người giao hàng'
          placeholder='Nhập tên người giao hàng'
          required
          type='input'
          autoFocus
          name='name'
        ></FormGroup>
        <FormGroup
          labelName='Số điện thoại'
          placeholder='Nhập số điện thoại người giao hàng'
          required
          type='input'
          name='phone'
        ></FormGroup>

        <ButtonAction to='/admin/shippers' />
      </Box>
    </div>
  );
}

export default AddShipper;
