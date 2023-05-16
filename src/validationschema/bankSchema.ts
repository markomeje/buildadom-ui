import * as yup from 'yup'

export const BankSchema = yup.object({
  bankName: yup.string().required('Bank Name is required'),
  accountName: yup.string().required('Account Name is required'),
  accountNumber: yup.string().required('Account Number is required'),
})

export const DriverSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phone: yup.string().required('Phone Number is required'),
})
