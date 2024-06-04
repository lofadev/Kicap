import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
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
import SelectOptions from '~/components/SelectOptions/SelectOptions';
import OrderDetailsService from '~/services/OrderDetailsService';
import OrderService from '~/services/OrderService';
import OrderStatusService from '~/services/OrderStatusService';
import ProvinceService from '~/services/ProvinceService';
import ShipperService from '~/services/ShipperService';
import { formatPriceToVND, timestampsToDatetime } from '~/utils/utils';
import './DetailOrder.scss';
import { schemaAddress, schemaOrderDetails, schemaShipper } from './schema';

const DetailOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalShipper, setOpenModalShipper] = useState(false);
  const [openModalConfirmDeleteOrderDetails, setOpenModalConfirmDeleteOrderDetails] =
    useState(false);
  const [openModalConfirmDeleteOrder, setOpenModalConfirmDeleteOrder] = useState(false);
  const [idItem, setIdItem] = useState();
  const [options, setOptions] = useState([]);
  const [optionsShipper, setOptionsShipper] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      variant: '',
      quantity: 0,
      price: 0,
    },
    validationSchema: schemaOrderDetails,
    onSubmit: async (payload) => {
      const res = await OrderDetailsService.updateOrderDetails(idItem, payload, dispatch);
      if (res.status === 'OK') {
        handleCloseModal();
        fetchOrderDetails(order.orderID);
        fetchOrder();
      }
    },
  });

  const formikAddress = useFormik({
    initialValues: {
      deliveryAddress: '',
      deliveryProvince: '',
    },
    validationSchema: schemaAddress,
    onSubmit: async (payload) => {
      const res = await OrderService.updateOrder(id, payload, dispatch);
      if (res.status === 'OK') {
        handleCloseModalAddress();
      }
    },
  });

  const formikShipper = useFormik({
    initialValues: {
      shipper: '',
    },
    validationSchema: schemaShipper,
    onSubmit: async (payload) => {
      const resShipper = await OrderService.updateOrder(id, { ...payload, status: 2 }, dispatch);
      if (resShipper.status === 'OK') {
        handleCloseModalShipper();
        await fetchOrder();
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

  const fetchOrder = async () => {
    const [resOrder, resStatus] = await Promise.all([
      OrderService.getOrder(id, dispatch),
      OrderStatusService.getOrderStatuses({}, dispatch),
    ]);
    if (resOrder.status === 'OK') {
      const status = resStatus.data.find((st) => st.status === resOrder.data.status).description;
      const newOrder = { ...resOrder.data, statusDesc: status };
      setOrder(newOrder);
      return newOrder.orderID;
    }
  };

  const fetchShipper = async () => {
    const res = await ShipperService.getShippers({}, dispatch);
    if (res.status === 'OK') {
      const shippers = res.data.map((s) => {
        return {
          id: s._id,
          name: s.name,
          value: s.name,
        };
      });
      setOptionsShipper(shippers);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const orderID = await fetchOrder();
      if (orderID) await fetchOrderDetails(orderID);
    };

    fetchData();
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

  const handleCloseModalShipper = () => {
    setOpenModalShipper(false);
  };

  const handleOpenDelete = (id) => {
    setOpenModalConfirmDeleteOrderDetails(true);
    setIdItem(id);
  };

  const handleDeleteItem = async () => {
    const res = await OrderDetailsService.deleteOrderDetails(idItem, dispatch);
    if (res.status === 'OK') {
      setOpenModalConfirmDeleteOrderDetails(false);
      await fetchOrderDetails(order.orderID);
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

  const handleAcceptOrder = async () => {
    const result = confirm('Xác nhận duyệt chấp nhận đơn hàng này ?');
    if (result) {
      const res = await OrderService.updateOrder(id, { status: 1 }, dispatch);
      if (res.status === 'OK') await fetchOrder();
    }
  };

  const handleTransferShipper = async () => {
    await fetchShipper();
    setOpenModalShipper(true);
    formikShipper.setFieldValue('shipper', order?.shipper);
  };

  const handleFinishedOrder = async () => {
    const res = await OrderService.updateOrder(id, { status: 3 }, dispatch);
    if (res.status === 'OK') await fetchOrder();
  };

  const handleCancelOrder = async () => {
    const res = await OrderService.updateOrder(id, { status: -1 }, dispatch);
    if (res.status === 'OK') await fetchOrder();
  };

  const handleRefuseOrder = async () => {
    const res = await OrderService.updateOrder(id, { status: -2 }, dispatch);
    if (res.status === 'OK') await fetchOrder();
  };

  return (
    <div className='order-details'>
      <HeadingBreadCrumb>Chi tiết đơn hàng</HeadingBreadCrumb>

      <Box title='Thông tin đơn hàng'>
        <div className='order-actions'>
          {order?.status >= 0 && order?.status < 2 && (
            <Button secondary onClick={handleOpenModalAddress}>
              Thay đổi địa chỉ
            </Button>
          )}
          {order?.status >= 0 && order?.status !== 3 && (
            <div className='update-order'>
              <Button secondary className='btn-update-order'>
                Xử lý đơn hàng <FaAngleDown />
              </Button>

              <div className='update-order-dropdown'>
                <div className='next-step-order'>
                  {order?.status === 0 && <span onClick={handleAcceptOrder}>Duyệt đơn hàng</span>}
                  {(order?.status === 1 || order?.status === 2) && (
                    <span onClick={handleTransferShipper}>Chuyển giao hàng</span>
                  )}
                  {order?.status === 2 && (
                    <span onClick={handleFinishedOrder}>Xác nhận hoàn tất đơn hàng</span>
                  )}
                </div>
                <div className='reject-order'>
                  <span onClick={handleCancelOrder}>Huỷ đơn hàng</span>
                  {order?.status < 2 && <span onClick={handleRefuseOrder}>Từ chối đơn hàng</span>}
                </div>
              </div>
            </div>
          )}
          {order?.status <= 0 && (
            <Button secondary onClick={() => setOpenModalConfirmDeleteOrder(true)}>
              Xoá đơn hàng
            </Button>
          )}
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
              <span>{order?.statusDesc}</span>
            </div>
          </div>
        </div>
      </Box>
      <Box title='Danh sách các mặt hàng thuộc đơn hàng'>
        <DataTable
          rows={rows}
          head={['STT', 'Ảnh', 'Tên hàng', 'Biến thể', 'Số lượng', 'Giá', 'Thành tiền']}
          keys={['index', 'image', 'name', 'variant', 'quantity', 'price', 'totalPrice']}
          handleOpenUpdate={handleOpenModal}
          handleOpenDelete={handleOpenDelete}
          isActions={order?.status < 2}
        />
        <div className='total-price'>
          <span className='order-total-price'>
            Tổng tiền: {formatPriceToVND(order?.totalPrice)}
          </span>
          <span>Phí ship: {formatPriceToVND(order?.shippingPrice)}</span>
        </div>
      </Box>
      {openModal && (
        <ModalDialog open={openModal} handleCancel={handleCloseModal}>
          <div className='modal-order-details'>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
              Cập nhật thông tin mặt hàng
            </h2>
            <main>
              <Input
                name='name'
                labelName={'Tên hàng'}
                formik={formik}
                required
                disabled='disabled'
              />
              <Input name='variant' labelName={'Biến thể'} formik={formik} disabled='disabled' />
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
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Thay đổi địa chỉ nhận hàng</h2>
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

      {openModalShipper && (
        <ModalDialog open={openModalShipper} handleCancel={handleCloseModalShipper}>
          <div className='modal-order-shipper'>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
              Chuyển đơn hàng cho người giao hàng
            </h2>
            <main>
              <SelectOptions
                labelName='Người giao hàng'
                required
                options={optionsShipper}
                optionDefault='--- Chọn người giao hàng ---'
                name='shipper'
                formik={formikShipper}
                value='name'
              />
            </main>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
              <Button secondary onClick={handleCloseModalShipper}>
                Huỷ
              </Button>
              <Button primary onClick={formikShipper.handleSubmit}>
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
    </div>
  );
};

export default DetailOrder;
