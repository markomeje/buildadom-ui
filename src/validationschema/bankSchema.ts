import * as yup from 'yup'

export const BankSchema = yup.object({
  bank: yup.string().required('Bank Name is required'),
  account_name: yup.string().required('Account Name is required'),
  account_number: yup.string().required('Account Number is required'),
})

export const DriverSchema = yup.object({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  phone: yup.string().required('Phone Number is required'),
})
