import * as yup from 'yup';
import { validate } from '~/validate/constant';

const schemaShipper = yup.object().shape({
  shipper: yup.string().required(validate.NOT_EMPTY),
});

const schemaAddress = yup.object().shape({
  deliveryAddress: yup.string().required(validate.NOT_EMPTY),
  deliveryProvince: yup.string().required(validate.NOT_EMPTY),
});

const schemaOrderDetails = yup.object().shape({
  quantity: yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
  price: yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
});

export { schemaAddress, schemaShipper, schemaOrderDetails };
