import * as yup from 'yup';
import { regex, validate } from '~/constant';

export const categorySchema = yup.object().shape({
  categoryName: yup.string().required(validate.NOT_EMPTY),
  description: yup.string(),
});

export const supplierSchema = yup.object().shape({
  name: yup.string().required(validate.NOT_EMPTY),
  contactName: yup.string().required(validate.NOT_EMPTY),
  phone: yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
  email: yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  address: yup.string().required(validate.NOT_EMPTY),
  province: yup.string().required(validate.NOT_EMPTY),
});

export const shipperSchema = yup.object().shape({
  name: yup.string().required(validate.NOT_EMPTY),
  phone: yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required(validate.NOT_EMPTY),
  phone: yup.string().required(validate.NOT_EMPTY).matches(regex.phone, validate.INVALID_PHONE),
  email: yup.string().required(validate.NOT_EMPTY).email(validate.INVALID_EMAIL),
  password: yup
    .string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD),
  confirmPassword: yup
    .string()
    .required(validate.NOT_EMPTY)
    .matches(regex.password, validate.INVALID_PASSWORD)
    .oneOf([yup.ref('password')], validate.NOT_MATCH_PASSWORD),
});
