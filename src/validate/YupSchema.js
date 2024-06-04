import * as Yup from 'yup';
import { regex, validate } from '~/validate/constant';

const schemaRequired = Yup.string().required(validate.NOT_EMPTY);
const schemaEmail = schemaRequired.email(validate.INVALID_EMAIL);
const schemaPhone = schemaRequired.matches(regex.phone, validate.INVALID_PHONE);
const schemaPassword = Yup.string()
  .required(validate.NOT_EMPTY)
  .matches(regex.password, validate.INVALID_PASSWORD);
// const hasTrim = Yup.string().trim();

export const categorySchema = Yup.object().shape({
  categoryName: schemaRequired,
  description: Yup.string(),
});

export const supplierSchema = Yup.object().shape({
  name: schemaRequired,
  contactName: schemaRequired,
  phone: schemaPhone,
  email: schemaEmail,
  address: schemaRequired.trim(),
  province: schemaRequired,
});

export const shipperSchema = Yup.object().shape({
  name: schemaRequired,
  phone: schemaPhone,
});

export const registerSchema = Yup.object().shape({
  name: schemaRequired.trim().max(50, 'Họ và tên chỉ được tối đa là 50 kí tự.'),
  phone: schemaPhone,
  email: schemaEmail,
  password: schemaPassword,
  confirmPassword: schemaPassword.oneOf([Yup.ref('password')], validate.NOT_MATCH_PASSWORD),
});

export const addCustomerSchema = Yup.object().shape({
  name: schemaRequired,
  phone: schemaPhone,
  address: schemaRequired,
  province: schemaRequired,
});

export const ProductSchema = Yup.object().shape({
  name: schemaRequired,
  description: Yup.string(),
  brand: schemaRequired,
  category: schemaRequired,
  supplier: schemaRequired,
  price: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
  image: Yup.mixed()
    .required(validate.NOT_EMPTY)
    .test('fileSize', validate.FIZE_SIZE, (value) => {
      if (value) {
        return value.size <= 2097152;
      }
      return true;
    }),
});

export const updateProductSchema = Yup.object().shape({
  name: schemaRequired,
  description: Yup.string(),
  brand: schemaRequired,
  category: schemaRequired,
  supplier: schemaRequired,
  price: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
  stock: Yup.number()
    .required(validate.NOT_EMPTY)
    .test('Số dương?', validate.INVALID_NUMBER, (value) => value >= 0),
  discount: Yup.number().required(validate.NOT_EMPTY),
  image: Yup.mixed().test('fileSize', validate.FIZE_SIZE, (value) => {
    if (value) {
      return value.size <= 2097152;
    }
    return true;
  }),
});

const imageSizeValidation = Yup.mixed().test('fileSize', validate.FIZE_SIZE, (value) => {
  if (value) {
    return value.size <= 2097152;
  }
  return true;
});

export const addProductImageSchema = Yup.object().shape({
  image: imageSizeValidation.required(validate.NOT_EMPTY),
  description: Yup.string(),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  isHidden: Yup.bool(),
});

export const updateProductImageSchema = Yup.object().shape({
  image: imageSizeValidation,
  description: Yup.string(),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  isHidden: Yup.bool(),
});

export const addProductVariantSchema = Yup.object().shape({
  name: schemaRequired,
  value: schemaRequired,
  price: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value > 0),
  stock: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value >= 0),
  discount: Yup.number().test('Số dương?', validate.INVALID_NUMBER, (value) => value >= 0),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  toImageOrder: Yup.number(),
});

export const addSlideSchema = Yup.object().shape({
  image: imageSizeValidation.required(validate.NOT_EMPTY),
  description: Yup.string(),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  toProduct: Yup.string(),
});

export const updateSlideSchema = Yup.object().shape({
  image: imageSizeValidation,
  description: Yup.string(),
  displayOrder: Yup.number().required(validate.NOT_EMPTY),
  toProduct: Yup.string(),
});

export const loginSchema = Yup.object().shape({
  email: schemaEmail,
  password: schemaPassword,
});

export const infoCheckoutSchema = Yup.object().shape({
  email: Yup.string().email(validate.INVALID_EMAIL),
  fullName: schemaRequired.trim(),
  phone: schemaPhone,
  address: schemaRequired.trim(),
  province: schemaRequired,
  note: Yup.string(),
});

export const schemaResetPassword = Yup.object().shape({
  newPassword: schemaPassword,
  confirmPassword: schemaPassword.oneOf([Yup.ref('newPassword')], validate.NOT_MATCH_PASSWORD),
});
