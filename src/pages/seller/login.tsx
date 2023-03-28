/* eslint-disable @next/next/no-img-element */
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { AuthError } from '@/interface/errors'
import { Login } from '@/interface/IForm'
import SellerAuth from '@/layout/seller/Auth'
import { useUserLoginMutation } from '@/redux/reducers/auth_reducer'
import { LoginSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

function Login() {
  const [userLogin, { isLoading }] = useUserLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    try {
      await userLogin(info).unwrap()
    } catch (err) {
      const error = (err as AuthError).data.message
      toast.error(error)
    }
  })
  return (
    <div className="max-w-[700px] mx-auto w-full flex flex-col items-center justify-center min-h-[600px] ">
      <img src="/assets/frame.png" alt="frame_image" className="mb-3" />

      <h1 className="font-poppins font-semibold leading-[60px] text-center text-[40px] text-bd-black">
        Welcome Back
      </h1>
      <span className="font-poppins  text-[18px] my-2 mx-auto max-w-[446px] leading-[27px] text-center">
        Input your correct details to login to your store
      </span>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center w-full py-4"
      >
        <Input
          title="Email Address"
          name="email"
          type="email"
          placeholder="enter email address"
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
        <Button
          title={isLoading ? 'Loading...' : 'Login'}
          classNames="w-full mt-4 h-[50px] rounded-[50px]"
        />
      </form>
    </div>
  )
}

export default Login

Login.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
