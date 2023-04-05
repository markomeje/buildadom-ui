/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import { BusinessPersonalSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import Button from '../shared/Button'
import { useForm } from 'react-hook-form'
import Input from '../shared/Input'
import { useAdduserMutation } from '@/redux/reducers/auth_reducer'
import { openModal } from '@/redux/reducers/modal_reducer'
import { toast } from 'react-toastify'
import { AuthError } from '@/interface/errors'

const Personal = () => {
  const dispatch = useAppDispatch()
  const { info } = useAppSelector((state) => state.step)
  const [addUser, { isLoading }] = useAdduserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(BusinessPersonalSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    const result = { ...info, ...data, type: 'business' }
    try {
      await addUser(result).unwrap()
      dispatch(openModal())
    } catch (err) {
      console.log(err)
      const error = (err as AuthError).data.errors
      for (const value of Object.values(error)) {
        toast.error(value[0])
      }
    }
  })

  return (
    <>
      <span className="font-poppins  text-[18px] my-6 mx-auto max-w-[446px] leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="First Name"
            name="firstname"
            type="text"
            error={errors}
            placeholder="enter first name"
            register={register}
          />{' '}
          <Input
            title="Last Name"
            name="lastname"
            type="text"
            error={errors}
            placeholder="enter last name"
            register={register}
          />
        </div>
        <Input
          title="Address"
          name="address"
          type="text"
          error={errors}
          placeholder="enter address"
          register={register}
        />
        <Input
          title="Password"
          name="password"
          type="password"
          error={errors}
          placeholder="********"
          register={register}
        />
        <Input
          title="Confirm Password"
          name="confirm_password"
          type="password"
          error={errors}
          placeholder="********"
          register={register}
        />

        <div className="flex items-end justify-end w-full mt-4">
          <Button
            title={`${isLoading ? 'Loading...' : 'Submit'}`}
            classNames="w-[205px] h-[50px] rounded-[50px]"
          />
        </div>
      </form>
    </>
  )
}

export default Personal
