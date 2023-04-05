import * as yup from 'yup'

const storeSchema = yup.object({
  name: yup.string().required('store name is required'),
  description: yup.string().required('store description is required'),
  // country_id: yup.number().required('store country id is required'),
  address: yup.string().required('store address is required'),
  // city: yup.string().required('store city is required'),
})

export { storeSchema }
