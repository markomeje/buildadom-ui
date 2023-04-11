/* eslint-disable @next/next/no-img-element */
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { AuthError } from '@/interface/errors'
import SellerAuth from '@/layout/seller/Auth'
import { useUserLoginMutation } from '@/redux/reducers/auth_reducer'
import { LoginSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import { setUser } from '@/redux/reducers/authToken_reducer'
import { useRouter } from 'next/router'
import { openModal } from '@/redux/reducers/modal_reducer'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import { LoginProp } from '@/interface/auth'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<string>('')
  const { show } = useAppSelector((state) => state.modal)
  const router = useRouter()
  const [userLogin, { isLoading }] = useUserLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    try {
      const result = await userLogin(info).unwrap()
      dispatch(setUser({ token: result }))
      toast.success('user logged in successfully')
      router.push('/seller/dashboard/create-store')
    } catch (err) {
      const error = (err as AuthError).data.message
      const { type } = (err as AuthError).data.verification
      toast.error(error)
      if (type === 'phone') {
        dispatch(openModal())
        setStatus('phone')
      } else {
        dispatch(openModal())
        setStatus('email')
      }
    }
  })
  return (
    <>
      {show && (
        <ModalWraper>
          <EmailVerificationModal status={status} />
        </ModalWraper>
      )}
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
    </>
  )
}

export default LoginPage

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
