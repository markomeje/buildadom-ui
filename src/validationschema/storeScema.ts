import * as yup from 'yup'

export const storeSchema = yup.object({
  name: yup.string().required('store name is required'),
  description: yup.string().required('store description is required'),
  address: yup.string().required('store address is required'),
})

export const IndividualIDValidationSchema = yup.object({
  is_business: yup.boolean(),
  fullname: yup.string().when('is_business', {
    is: (is_business: boolean) => is_business === true,
    then: (schema) => schema.required('firstname is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  state: yup.string().when('is_business', {
    is: (is_business: boolean) => is_business === true,
    then: (schema) => schema.required('state is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  address: yup.string().required('address is required'),
  dob: yup.string().required('Date of Birth is required'),
  id_number: yup.string().required('Id Number is required'),
  id_type: yup.string().required('Id Type is required'),
  expiry_date: yup.string().required('Expiry Data is required'),
})

export const productSchema = yup.object({
  name: yup.string().required('Product Name is required'),
  description: yup.string().required('Product Description is required'),
  price: yup.string().required('Product Price is required'),
  quantity: yup.string().required('Quantity is required'),
  category_id: yup.string().required('Product Category is required'),
  currency_id: yup.number().required('Product Currency ID is required'),
})
