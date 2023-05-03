import { AuthError } from '@/interface/error.interface'
import { setAddedStepper } from '@/redux/reducer/countryReducer'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { closeModal } from '@/redux/reducer/modalReducer'
import { setStepper } from '@/redux/reducer/stepperReducer'
import {
  useAddProductMutation,
  useGetProductsCategoriesQuery,
  useMerchantStoreDetailsQuery,
} from '@/redux/services/merchant'
import { useGetCurrenciesQuery } from '@/redux/services/utility.slice'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import InputSelect from '@/ui/input/InputSelect'
import TextArea from '@/ui/input/TextArea'
import Input from '@/ui/input/TextInput'
import { productSchema } from '@/validationschema/storeScema'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddProductModal = () => {
  const dispatch = useTypedDispatch()
  const { data: storeInfo } = useMerchantStoreDetailsQuery()
  const { data } = useGetProductsCategoriesQuery()
  const { data: currencies } = useGetCurrenciesQuery()
  const [addProduct, { isLoading }] = useAddProductMutation()
  const { newProduct } = useTypedSelector((state) => state.dashboard)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(productSchema),
  })

  const closeProductModal = () => {
    dispatch(closeModal())
  }

  useEffect(() => {
    setValue('name', newProduct.name)
    setValue('description', newProduct.description)
    setValue('price', newProduct.price)
    setValue('quantity', newProduct.quantity)
    setValue('category', newProduct.category_id)
    setValue('currency_id', newProduct.currency_id)
  }, [newProduct, setValue])

  const onSubmit = handleSubmit(async (info) => {
    console.log(info, 'infooo')
    const formData = new FormData()
    if (storeInfo) {
      console.log(storeInfo, info)
      formData.append('name', info.name)
      formData.append('description', info.description)
      formData.append('price', info.price)
      formData.append('quantity', info.quantity)
      formData.append('category_id', info.category)
      formData.append('currency_id', info.currency_id)
      formData.append('store_id', storeInfo.id.toString())
      try {
        // // if (newProduct && Object.keys(newProduct).length > 0) {
        //   const res = await updateProduct(formData).unwrap()
        //   dispatch(setAddedStepper(res))
        //   dispatch(setStepper(2))
        // } else {
        const res = await addProduct(formData).unwrap()
        dispatch(setAddedStepper(res))
        dispatch(setStepper(2))
        // }
      } catch (err) {
        console.log(err, 'errorsss')
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })
  return (
    <div className="flex flex-col w-full h-full z-50 p-[20px] justify-center">
      <h1 className="text-[#23262F] flex justify-between border-b pb-3 border-[#CCCCCC]  items-center font-semibold font-poppins text-[24px] leading-[40px]">
        Upload Product
        <i
          className="text-[16px] w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
          onClick={closeProductModal}
        ></i>
      </h1>
      <form
        onSubmit={onSubmit}
        className="pt-4 lg:h-[520px] px-1 overflow-scroll"
      >
        <Input
          title="Product Name"
          placeholder="enter product name"
          type="text"
          name="name"
          register={register}
          error={errors}
        />
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="Product Price"
            name="price"
            type="number"
            placeholder="# 0.00"
            error={errors}
            register={register}
          />
          <Input
            title="Quantity in stock"
            name="quantity"
            type="number"
            placeholder="0"
            error={errors}
            register={register}
          />
        </div>
        <InputSelect
          data={data && data}
          control={control}
          errors={errors}
          label="Prdouct Category"
          name="category"
        />
        <InputSelect
          data={currencies && currencies}
          control={control}
          errors={errors}
          label="Select Currency"
          name="currency_id"
        />
        <TextArea
          title="Description"
          placeholder="Product Description"
          type="text"
          name="description"
          register={register}
          error={errors}
        />
        <div className="flex items-end py-3 justify-end w-full">
          <Button
            title={isLoading ? 'Loaing...' : 'Upload Product'}
            classNames=" w-[237px] text-[14px] h-[46px] rounded-[90px]"
          />
        </div>
      </form>
    </div>
  )
}

export default AddProductModal
