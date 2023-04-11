import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import InputSelect from '@/components/shared/InputSelect'
import TextArea from '@/components/shared/TextArea'
import { storeSchema } from '@/schema/dashboard/store'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddProductModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(storeSchema),
  })

  const onSubmit = handleSubmit((info) => {
    console.log(info)
  })
  return (
    <div className="flex flex-col w-full h-full  p-[20px] justify-center">
      <h1 className="text-[#23262F] flex justify-between border-b pb-3 border-[#CCCCCC]  items-center font-semibold font-poppins text-[24px] leading-[40px]">
        Upload Product
        <i className="text-[16px] w-[30px] h-[30px] rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"></i>
      </h1>
      <form onSubmit={onSubmit}>
        <Input
          title="Product Name"
          placeholder="enter product name"
          type="text"
          name="name"
          register={register}
          error={errors}
        />
        <TextArea
          title="Description"
          placeholder="Product Description"
          type="text"
          name="description"
          register={register}
          error={errors}
        />
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="Product Price"
            name="price"
            type="text"
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
        <InputSelect />
        <div className="flex items-end justify-end w-full">
          <Button
            title="Upload Product"
            classNames=" w-[237px] h-[48px] rounded-[90px]"
          />
        </div>
      </form>
    </div>
  )
}

export default AddProductModal
