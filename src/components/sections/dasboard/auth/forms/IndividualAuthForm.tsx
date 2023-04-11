import { useAppDispatch } from '@/hooks/useReducer'
import { Form1 } from '@/interface/auth'
import { useAdduserMutation } from '@/redux/reducers/auth_reducer'
import { IndividualAuthSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import React from 'react'
import { addInfo, incrementStepper } from '@/redux/reducers/step_reducer'
import { openModal } from '@/redux/reducers/modal_reducer'
import { AuthError } from '@/interface/errors'
import { toast } from 'react-toastify'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
// import PhoneInputs from '@/components/shared/PhoneInput'

const IndividualAuthForm = () => {
  const dispatch = useAppDispatch()
  const [addUser, { isLoading }] = useAdduserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form1>({
    resolver: yupResolver(IndividualAuthSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    try {
      addInfo(info)
      await addUser({ ...info, type: 'individual' }).unwrap()
      dispatch(incrementStepper())
      dispatch(openModal())
    } catch (err) {
      console.log(err)
      if ((err as AuthError).data?.errors) {
        for (const value of Object.values((err as AuthError).data?.errors)) {
          toast.error(value[0])
        }
      }
    }
  })
  return (
    <>
      <span className="font-poppins  text-[18px] my-6 mx-auto max-w-[446px] leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form onSubmit={onSubmit} className="flex flex-col  items-center">
        <div className="grid grid-cols-2 gap-x-6 w-full">
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
        {/* <PhoneInputs /> */}
        <Input
          title="Phone Number"
          name="phone"
          type="text"
          placeholder="enter phone number"
          register={register}
          error={errors}
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

        <div className="flex items-end justify-end w-full mt-4">
          <Button
            title={isLoading ? 'Loading...' : 'Submit'}
            classNames="w-[205px] h-[50px] rounded-[50px]"
          />
        </div>
      </form>
    </>
  )
}

export default IndividualAuthForm
