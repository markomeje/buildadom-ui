import * as yup from 'yup'

export const BankSchema = yup.object({
  bankName: yup.string().required('Bank Name is required'),
  accountName: yup.string().required('Account Name is required'),
  accountNumber: yup.string().required('Account Number is required'),
})
