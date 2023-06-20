/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginProp } from '@/interface/auth'
import { AuthError } from '@/interface/errors'
import MainLayout from '@/layouts/MainLAyout'
import { setToken } from '@/redux/reducer/tokenReducer'
import { useUserLoginMutation } from '@/redux/services/auth.service'
import { useTypedDispatch, wrapper } from '@/redux/store'
import Button from '@/ui/button/Button'
import Input from '@/ui/input/TextInput'
import { LoginSchema } from '@/validationschema/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const BuyerLogin = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>({
    resolver: yupResolver(LoginSchema),
  })
  const [userLogin, { isLoading }] = useUserLoginMutation()

  const onSubmit = handleSubmit(async (info) => {
    try {
      const result = await userLogin(info).unwrap()
      dispatch(setToken({ token: result }))
      toast.success('user logged in successfully')
      router.push('/buyer/dashboard')
    } catch (err) {
      if (!(err as AuthError).data)
        return toast.error('Check yout network connection')
      const error = (err as AuthError).data.message
      toast.error(error)
    }
  })

  return (
    <div className="wrapper">
      <h1 className="pt-12 pb-8 w-full  font-semibold text-[32px] leading-[40px]">
        Customer Login
      </h1>
      <div className="flex items-center mb-6 ml-10">
        <div className="w-[500px] flex flex-col mr-7 p-6 min-h-[400px] bg-[#F5F9FF]">
          <h1 className="w-full  font-semibold text-[18px] leading-[30px]">
            Registered Cusomers
          </h1>
          <p className="font-poppins pt-3 text-[#333333] text-[14px] leading-[21px]">
            If you have an account, sign in with your email address.
          </p>
          <form
            onSubmit={onSubmit}
            className="flex flex-col px-4 lg:px-0 items-center justify-center w-full py-4"
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
            <div className="flex w-full mt-4 items-center">
              <Button
                title={isLoading ? 'Loading...' : 'Sign in'}
                classNames="w-[220px] mr-4 text-[14px] py-3 rounded-[50px]"
              />
              <span className="font-poppins text-[14px] leading-[20px] text-bd-blue">
                Forgot Your Password?
              </span>
            </div>
          </form>
        </div>
        <div className="w-[500px] flex flex-col p-6 min-h-[400px] bg-[#F5F9FF]">
          <h1 className="w-full  font-semibold text-[18px] leading-[30px]">
            New Customer?
          </h1>
          <p className="font-poppins pt-3 text-[#333333] text-[14px] leading-[21px]">
            Creating an account has many benefits
          </p>
          <ul>
            <li className="font-poppins pt-3 text-[#333333] text-[14px] leading-[21px]">
              Checkout faster
            </li>
            <li className="font-poppins pt-3 text-[#333333] text-[14px] leading-[21px]">
              Keep more than one address
            </li>
            <li className="font-poppins pt-3 text-[#333333] text-[14px] leading-[21px]">
              Track orders and more
            </li>
          </ul>
          <Link href={'/siginup'}>
            <Button
              title="Create an account"
              classNames="w-[220px] mt-8 py-3 text-[14px] rounded-[50px]"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuyerLogin

BuyerLogin.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if (token) {
      return {
        redirect: {
          destination: '/buyer/dashboard',
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  })
