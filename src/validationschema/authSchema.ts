import * as yup from 'yup'

export const IndividualAuthSchema = yup.object({
  firstname: yup.string().required('first name is required'),
  lastname: yup.string().required('last name is required'),
  email: yup.string().required().email('must be a valid email address'),
  phone: yup.string().required('phone number is required'),
  password: yup.string().required('password is required'),
  address: yup.string().required('address is required'),
  confirm_password: yup
    .string()
    .required('comfirm password is required')
    .oneOf([yup.ref('password')], 'password does not match'),
})

export const BusinessAuthSchema = yup.object({
  business_name: yup.string().required('business name is required'),
  cac_number: yup.string().required('cac number is required'),
  website: yup.string(),
  phone: yup.string().required('phone is required'),
  email: yup.string().required().email('must be a valid email address'),
  password: yup.string().required('password is required'),
  address: yup.string().required('address is required'),
  confirm_password: yup
    .string()
    .required('comfirm password is required')
    .oneOf([yup.ref('password')], 'password does not match'),
})

export const LoginSchema = yup.object({
  email: yup.string().required().email('must be a valid email address'),
  password: yup.string().required('password is required'),
})
