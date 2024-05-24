import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import HeadingBreadCrumb from '~/components/Admin/HeadingBreadCrumb/HeadingBreadCrumb';
import Button from '~/components/Button/Button';
import DataTable from '~/components/DataTable/DataTable';
import Input from '~/components/FormGroup/Input/Input';
import InputNumber from '~/components/FormGroup/InputNumber/InputNumber';
import ModalConfirm from '~/components/ModalConfirm/ModalConfirm';
import ModalDialog from '~/components/ModalDialog/ModalDialog';
import OrderDetailsService from '~/services/OrderDetailsService';
import OrderService from '~/services/OrderService';
import OrderStatusService from '~/services/OrderStatusService';
import { timestampsToDatetime } from '~/utils/utils';
import './DetailOrder.scss';
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import ProvinceService from '~/services/ProvinceService';

const DetailOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalConfirmDeleteOrderDetails, setOpenModalConfirmDeleteOrderDetails] =
    useState(false);
  const [openModalConfirmDeleteOrder, setOpenModalConfirmDeleteOrder] = useState(false);
  const [idItem, setIdItem] = useState();
  const [options, setOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      variant: '',
      quantity: 0,
      price: 0,
    },
    onSubmit: async (payload) => {
      const res = await OrderDetailsService.updateOrderDetails(idItem, payload, dispatch);
      if (res.status === 'OK') {
        handleCloseModal();
        fetchOrderDetails(order.orderID);
      }
    },
  });

  const formikAddress = useFormik({
    initialValues: {
      deliveryAddress: '',
      deliveryProvince: '',
    },
    onSubmit: async (payload) => {
      const res = await OrderService.updateOrder(id, payload, dispatch);
      if (res.status === 'OK') {
        handleCloseModalAddress();
      }
    },
  });

  const fetchProvince = async () => {
    const provinceRes = await ProvinceService.getProvinces();
    if (provinceRes.status === 'OK') {
      const options = provinceRes.data.map((province) => {
        return {
          id: province.provinceId,
          name: province.provinceName,
        };
      });
      setOptions(options);
    }
  };

  const fetchOrderDetails = async (orderID) => {
    const resOrderDetails = await OrderDetailsService.getOrderDetails({ orderID }, dispatch);
    if (resOrderDetails.status == 'OK') {
      const dataRows = resOrderDetails.data.map((item, index) => {
        const { image, name, price, variant, quantity, _id } = item;
        return {
          id: _id,
          index: index + 1,
          image,
          name,
          variant,
          quantity,
          price: price,
          totalPrice: price * quantity,
        };
      });
      setRows(dataRows);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const [resOrder, resStatus] = await Promise.all([
        OrderService.getOrder(id, dispatch),
        OrderStatusService.getOrderStatuses({}, dispatch),
      ]);
      if (resOrder.status === 'OK') {
        const status = resStatus.data.find((st) => st.status === resOrder.data.status).description;
        const newOrder = { ...resOrder.data, status };
        setOrder(newOrder);
        await fetchOrderDetails(newOrder.orderID);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (id) => {
    setIdItem(id);
    setOpenModal(true);
    const item = rows.find((i) => i.id === id);
    const { name, variant, quantity, price } = item;
    const values = { name, variant, quantity, price };
    formik.setValues(values);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModalAddress = () => {
    setOpenModalAddress(false);
  };

  const handleOpenDelete = (id) => {
    setOpenModalConfirmDeleteOrderDetails(true);
    setIdItem(id);
  };

  const handleDeleteItem = async () => {
    const res = await OrderDetailsService.deleteOrderDetails(idItem, dispatch);
    if (res.status === 'OK') {
      setOpenModalConfirmDeleteOrderDetails(false);
      fetchOrderDetails(order.orderID);
    }
  };

  const handleDeleteOrder = async () => {
    const res = await OrderService.deleteOrder(order.orderID, dispatch);
    if (res.status === 'OK') {
      setOpenModalConfirmDeleteOrder(false);
      navigate('/admin/orders');
    }
  };

  const handleOpenModalAddress = async () => {
    await fetchProvince();
    setOpenModalAddress(true);
    const { deliveryAddress, deliveryProvince } = order;
    const values = { deliveryAddress, deliveryProvince };
    formikAddress.setValues(values);
  };

  return (
    <div className='order-details'>
      <HeadingBreadCrumb>Chi tiết đơn hàng</HeadingBreadCrumb>

      <Box title='Thông tin đơn hàng'>
        <div className='order-actions'>
          <Button secondary onClick={handleOpenModalAddress}>
            Thay đổi địa chỉ
          </Button>
          <Button secondary>Cập nhật đơn hàng</Button>
          <Button secondary onClick={() => setOpenModalConfirmDeleteOrder(true)}>
            Xoá đơn hàng
          </Button>
          <Button secondary to={'/admin/orders'}>
            Quay lại
          </Button>
        </div>
        <div className='order-info'>
          <div className='order-info-left'>
            <div className='order-info-field'>
              <span>Mã đơn hàng:</span>
              <span>Khách hàng:</span>
              <span>Địa chỉ:</span>
              <span>Tỉnh/thành phố:</span>
              <span>Số điện thoại:</span>
              <span>Email:</span>
              <span>Ghi chú:</span>
            </div>

            <div className='order-info-value'>
              <span>{order?.orderID}</span>
              <span>{order?.fullName}</span>
              <span>{order?.deliveryAddress}</span>
              <span>{order?.deliveryProvince}</span>
              <span>{order?.phone}</span>
              <span>{order?.email}</span>
              <span style={{ maxWidth: '400px' }}>{order?.note}</span>
            </div>
          </div>

          <div className='order-info-right'>
            <div className='order-info-field'>
              <span>Người giao hàng:</span>
              <span>Ngày lập đơn hàng:</span>
              <span>Ngày nhận đơn hàng:</span>
              <span>Nhận giao hàng lúc:</span>
              <span>Thời điểm hoàn tất:</span>
              <span>Phương thức thanh toán:</span>
              <span>Trạng thái thanh toán:</span>
              <span>Trạng thái đơn hàng:</span>
            </div>

            <div className='order-info-value'>
              <span>{order?.shipper}</span>
              <span>{order?.orderTime ? timestampsToDatetime(order?.orderTime) : ''}</span>
              <span>{order?.acceptTime ? timestampsToDatetime(order?.acceptTime) : ''}</span>
              <span>{order?.shippedTime ? timestampsToDatetime(order?.shippedTime) : ''}</span>
              <span>{order?.finishedTime ? timestampsToDatetime(order?.finishedTime) : ''}</span>
              <span>{order?.paymentMethod}</span>
              <span>{order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
              <span>{order?.status}</span>
            </div>
          </div>
        </div>
      </Box>
      <Box title='Danh sách các mặt hàng thuộc đơn hàng'>
        {openModal && (
          <ModalDialog open={openModal} handleCancel={handleCloseModal}>
            <div className='modal-order-details'>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
                Cập nhật thông tin mặt hàng
              </h2>
              <main>
                <Input name='name' labelName={'Tên hàng'} formik={formik} required />
                <Input name='variant' labelName={'Biến thể'} formik={formik} />
                <InputNumber
                  name='quantity'
                  labelName={'Số lượng'}
                  formik={formik}
                  required
                  min={1}
                />
                <InputNumber name='price' labelName={'Giá'} formik={formik} required isPrice />
              </main>
              <div style={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
                <Button secondary onClick={handleCloseModal}>
                  Huỷ
                </Button>
                <Button primary onClick={formik.handleSubmit}>
                  Cập nhật
                </Button>
              </div>
            </div>
          </ModalDialog>
        )}

        {openModalAddress && (
          <ModalDialog open={openModalAddress} handleCancel={handleCloseModalAddress}>
            <div className='modal-order-address'>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
                Thay đổi địa chỉ nhận hàng
              </h2>
              <main>
                <Input
                  labelName='Địa chỉ'
                  placeholder='Nhập địa chỉ khách hàng'
                  required
                  name='deliveryAddress'
                  formik={formikAddress}
                />
                <SelectOptions
                  labelName='Tỉnh/thành'
                  required
                  options={options}
                  optionDefault='--- Chọn Tỉnh/thành ---'
                  name='deliveryProvince'
                  formik={formikAddress}
                  value='name'
                />
              </main>
              <div style={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
                <Button secondary onClick={handleCloseModalAddress}>
                  Huỷ
                </Button>
                <Button primary onClick={formikAddress.handleSubmit}>
                  Cập nhật
                </Button>
              </div>
            </div>
          </ModalDialog>
        )}

        {openModalConfirmDeleteOrderDetails && (
          <ModalConfirm
            desc={'Bạn có muốn xoá sản phẩm này khỏi đơn đặt hàng không ?'}
            handleClose={() => setOpenModalConfirmDeleteOrderDetails(false)}
            handleDelete={handleDeleteItem}
            open={openModalConfirmDeleteOrderDetails}
          />
        )}

        {openModalConfirmDeleteOrder && (
          <ModalConfirm
            desc={'Bạn có muốn xoá đơn đặt hàng này không ?'}
            handleClose={() => setOpenModalConfirmDeleteOrder(false)}
            handleDelete={handleDeleteOrder}
            open={openModalConfirmDeleteOrder}
          />
        )}
        <DataTable
          rows={rows}
          head={['STT', 'Ảnh', 'Tên hàng', 'Biến thể', 'Số lượng', 'Giá', 'Thành tiền']}
          keys={['index', 'image', 'name', 'variant', 'quantity', 'price', 'totalPrice']}
          handleOpenUpdate={handleOpenModal}
          handleOpenDelete={handleOpenDelete}
        />
      </Box>
    </div>
  );
};

export default DetailOrder;
