/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import LandingPage from '@/layouts/LandingPage'
import { LoginSchema } from '@/validationschema/authSchema'
import { LoginProp } from '@/interface/form.interface'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import Input from '@/ui/input/TextInput'
import Button from '@/ui/button/Button'
import { useUserLoginMutation } from '@/redux/services/auth.service'
import { AuthError } from '@/interface/error.interface'
import { setToken } from '@/redux/reducer/tokenReducer'
import { openModal } from '@/redux/reducer/modalReducer'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'

const LoginPage = () => {
  const dispatch = useTypedDispatch()
  const [status, setStatus] = useState<string>('')
  const { show } = useTypedSelector((state) => state.modal)
  const { token, loggedUser } = useTypedSelector((state) => state.authToken)

  console.log(token, loggedUser, 'dddd')
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
      console.log(info)
      const result = await userLogin(info).unwrap()
      dispatch(setToken({ token: result }))
      toast.success('user logged in successfully')
      router.push('/dashboard')
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
  return <LandingPage>{page}</LandingPage>
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  })
