import { AuthError } from '@/interface/errors'
import { IDriver } from '@/interface/form.interface'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { closeModal } from '@/redux/reducer/modalReducer'
import {
  useAddDriverMutation,
  useGetDriverQuery,
  useUpdateDriverMutation,
} from '@/redux/services/drivers.service'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import Input from '@/ui/input/TextInput'
import { DriverSchema } from '@/validationschema/bankSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

export interface INewData {
  firstname: string
  lastname: string
  phone: string
  id?: number
}

const AddDriverModal = ({ id }: { id?: number }) => {
  const dispatch = useTypedDispatch()
  const { countryCode } = useTypedSelector((state) => state.dashboard)
  const [addDriver, { isLoading }] = useAddDriverMutation()
  const [updateDriver, { isLoading: updating }] = useUpdateDriverMutation()

  const { data } = useGetDriverQuery()

  const closeDriverModal = () => {
    dispatch(closeModal())
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDriver>({
    resolver: yupResolver(DriverSchema),
  })

  useEffect(() => {
    if (id && data) {
      const result = data.find((x: INewData) => x.id === id)
      setValue('firstname', result.firstname)
      setValue('lastname', result.lastname)
      setValue(
        'phone',
        result.phone && result.phone.substring(4, result.phone.length)
      )
    }
  }, [id, data, setValue])

  const onSubmit = handleSubmit(async (info) => {
    const formData = {
      ...info,
      phone: countryCode.dial_code + info.phone,
    }
    try {
      if (id) {
        const result = await updateDriver({ id, data: formData }).unwrap()
        toast.success(result)
      } else {
        const result = await addDriver(formData).unwrap()
        toast.success(result)
      }
      closeDriverModal()
    } catch (err) {
      console.log(err, 'errror')
      if ((err as AuthError).data?.errors) {
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })

  return (
    <div className="flex flex-col w-full h-full p-6 z-50 max-w-[500px] py-[20px] justify-center">
      <h1 className="text-[#23262F] flex justify-between border-b pb-3 border-[#CCCCCC]  items-center font-semibold font-poppins text-[20px] leading-[40px]">
        {id ? 'Update Driver' : 'Add A Driver'}
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
          name="firstname"
          register={register}
          error={errors}
        />
        <Input
          title="Enter Last Name"
          placeholder="enter last name"
          type="text"
          name="lastname"
          register={register}
          error={errors}
        />
        <CountryCodeSelector
          register={register}
          error={errors}
          title="Phone Number"
          name="phone"
          type="string"
          placeholder="enter phone number"
        />

        <Button
          title={isLoading || updating ? 'Loading...' : 'Save'}
          classNames="w-full h-[50px] rounded-[50px] my-4 "
        />
      </form>
    </div>
  )
}

export default AddDriverModal
