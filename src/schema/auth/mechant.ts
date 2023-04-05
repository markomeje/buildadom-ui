import * as yup from 'yup'

const LoginSchema = yup.object({
  email: yup.string().required().email('must be a valid email address'),
  password: yup.string().required('password is required'),
})

const IndividualAuthSchema = yup.object({
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

const BusinessAuthSchema = yup.object({
  business_name: yup.string().required('business name is required'),
  cac_number: yup.string().required('cac number is required'),
  website: yup.string().required('website is required'),
  phone: yup.string().required('phone is required'),
  email: yup.string().required().email('must be a valid email address'),
})

const BusinessPersonalSchema = yup.object({
  firstname: yup.string().required('first name is required'),
  lastname: yup.string().required('last name is required'),
  password: yup.string().required('password is required'),
  address: yup.string().required('address is required'),
  confirm_password: yup
    .string()
    .required('comfirm password is required')
    .oneOf([yup.ref('password')], 'password does not match'),
})

const VerificationCodeSchema = yup.object({
  one: yup.string().length(1).required(),
  two: yup.string().length(1).required(),
  three: yup.string().length(1).required(),
  four: yup.string().length(1).required(),
  five: yup.string().length(1).required(),
  six: yup.string().length(1).required(),
})

const IndividualIDValidationSchema = yup.object({
  address: yup.string().required('address is required'),
  dob: yup.string().required('Date of Birth is required'),
  id_number: yup.string().required('Id Number is required'),
  id_type: yup.string().required('Id Type is required'),
  expiry_date: yup.string().required('Expiry Data is required'),
})

export {
  IndividualAuthSchema,
  BusinessAuthSchema,
  IndividualIDValidationSchema,
  BusinessPersonalSchema,
  VerificationCodeSchema,
  LoginSchema,
}
