import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IndividualAuthSchema } from '@/validationschema/authSchema'
import { IndividalMechant } from '@/interface/form.interface'
import Input from '../input/TextInput'
import Button from '../button/Button'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { openModal } from '@/redux/reducer/modalReducer'
import { useAdduserMutation } from '@/redux/services/auth.service'
import { AuthError } from '@/interface/error.interface'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'

const CountryCodeSelector = dynamic(
  () => import('../input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const MechantIndividualRegistration = () => {
  const dispatch = useTypedDispatch()
  const [addUser, { isLoading }] = useAdduserMutation()
  const { countryCode } = useTypedSelector((state) => state.dashboard)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividalMechant>({
    resolver: yupResolver(IndividualAuthSchema),
  })
  const onSubmit = handleSubmit(async (info) => {
    try {
      const formData = {
        ...info,
        phone: countryCode.dial_code + info.phone,
        type: 'individual',
      }
      await addUser(formData).unwrap()
      dispatch(openModal())
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        for (const value of Object.values((err as AuthError).data?.errors)) {
          toast.error(value[0])
        }
      }
    }
  })
  return (
    <>
      <h1 className="font-poppins font-semibold leading-[38px] lg:leading-[60px] text-center text-[28px] lg:text-[40px] text-bd-black">
        Create your Individual business account
      </h1>
      <span className="font-poppins text-gray-[200] text-[16px] lg:text-[18px] mb-4 mt-3 px-4 lg:px-0 mx-auto py-2 leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form
        onSubmit={onSubmit}
        className="flex flex-col px-4 lg:px-0 items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 w-full">
          <Input
            title="First Name"
            name="firstname"
            type="text"
            placeholder="enter first name"
            error={errors}
            register={register}
          />
          <Input
            title="Last Name"
            name="lastname"
            type="text"
            placeholder="enter last name"
            register={register}
            error={errors}
          />
        </div>
        <Input
          title="Email Address"
          name="email"
          type="email"
          placeholder="enter email address"
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
        <Input
          title="Address"
          name="address"
          type="text"
          placeholder="enter address"
          register={register}
          error={errors}
        />
        <Input
          title="Password"
          name="password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />

        <Input
          title="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />

        <div className="flex lg:items-end lg:justify-end w-full mt-4">
          <Button
            title={isLoading ? 'Loading...' : 'Submit'}
            classNames="w-[205px] h-[50px] rounded-[50px]"
          />
        </div>
      </form>
    </>
  )
}

export default MechantIndividualRegistration
