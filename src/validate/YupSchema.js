import * as Yup from 'yup';
import { regex, validate } from '~/constant';

export const categorySchema = Yup.object().shape({
  categoryName: Yup.string().required(validate.NOT_EMPTY),
  description: Yup.string(),
});

export const supplierSchema = Yup.object().shape({
  name: Yup.string().required(validate.NOT_EMPTY),
  contactName: Yup.string().required(validate.NOT_EMPTY),
  phone: Yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
  email: Yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  address: Yup.string().required(validate.NOT_EMPTY),
  province: Yup.string().required(validate.NOT_EMPTY),
});

export const shipperSchema = Yup.object().shape({
  name: Yup.string().required(validate.NOT_EMPTY),
  phone: Yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(validate.NOT_EMPTY),
  phone: Yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
  email: Yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  password: Yup.string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD),
  confirmPassword: Yup.string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD)
    .oneOf([Yup.ref('password')], validate.NOT_MATCH_PASSWORD),
});

export const addCustomerSchema = Yup.object().shape({
  name: Yup.string().required(validate.NOT_EMPTY),
  phone: Yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
  address: Yup.string().required(validate.NOT_EMPTY),
  province: Yup.string().required(validate.NOT_EMPTY),
});

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(validate.NOT_EMPTY),
  description: Yup.string(),
  brand: Yup.string().required(validate.NOT_EMPTY),
  categoryID: Yup.string().required(validate.NOT_EMPTY),
  supplierID: Yup.string().required(validate.NOT_EMPTY),
  stock: Yup.number(),
  price: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
  discount: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value >= 0),
  image: Yup.mixed()
    .required(validate.NOT_EMPTY)
    .test('fileSize', validate.FIZE_SIZE, (value) => {
      if (value) {
        return value.size <= 2097152;
      }
      return true;
    }),
});

export const addProductImageSchema = Yup.object().shape({
  image: Yup.mixed()
    .required(validate.NOT_EMPTY)
    .test('fileSize', validate.FIZE_SIZE, (value) => {
      if (value) {
        return value.size <= 2097152;
      }
      return true;
    }),
  description: Yup.string(),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  isHidden: Yup.bool(),
});
