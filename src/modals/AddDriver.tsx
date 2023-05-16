import { IDriver } from '@/interface/form.interface'
import { closeModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import Input from '@/ui/input/TextInput'
import { DriverSchema } from '@/validationschema/bankSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'
import React from 'react'
import { useForm } from 'react-hook-form'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const AddDriverModal = () => {
  const dispatch = useTypedDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDriver>({
    resolver: yupResolver(DriverSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    console.log(info)
  })

  const closeDriverModal = () => {
    dispatch(closeModal())
  }

  return (
    <div className="flex flex-col w-full h-full p-6 z-50 max-w-[500px] py-[20px] justify-center">
      <h1 className="text-[#23262F] flex justify-between border-b pb-3 border-[#CCCCCC]  items-center font-semibold font-poppins text-[20px] leading-[40px]">
        Add A Driver
        <i
          className="text-[16px] w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
          onClick={closeDriverModal}
        ></i>
      </h1>
      <form onSubmit={onSubmit}>
        <Input
          title="Enter First Name"
          placeholder="First Name"
          type="text"
          name="firstName"
          register={register}
          error={errors}
        />
        <Input
          title="Enter Last Name"
          placeholder="enter last name"
          type="text"
          name="lastName"
          register={register}
          error={errors}
        />
        <CountryCodeSelector
          register={register}
          error={errors}
          title="Phone Number"
          name="phone"
          type="number"
          placeholder="enter phone number"
        />

        <Button
          title={'Save'}
          classNames="w-full h-[50px] rounded-[50px] my-4 "
        />
      </form>
    </div>
  )
}

export default AddDriverModal
