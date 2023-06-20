/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistrationProp } from '@/interface/auth'
import { AuthError } from '@/interface/errors'
import MainLayout from '@/layouts/MainLAyout'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { useCustomerSignUpMutation } from '@/redux/services/auth.service'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import Button from '@/ui/button/Button'
import GoogleButton from '@/ui/button/GoogleButton'
import Input from '@/ui/input/TextInput'
import { RegistrationSchema } from '@/validationschema/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const BuyerSiginup = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationProp>({
    resolver: yupResolver(RegistrationSchema),
  })

  const { countryCode } = useTypedSelector((state) => state.dashboard)
  const [customerSignup, { isLoading }] = useCustomerSignUpMutation()

  const onSubmit = handleSubmit(async (info) => {
    try {
      const formData = {
        ...info,
        phone: countryCode.dial_code + info.phone,
      }
      const res = await customerSignup(formData).unwrap()
      if (res) {
        console.log(res)
        toast.success(res.message)
        router.push('/login')
      }
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })

  return (
    <div className="wrapper">
      <h1 className="pt-12 pb-8 w-full  font-semibold text-[32px] leading-[40px]">
        Customer Sign Up
      </h1>

      <div className="w-[580px] mx-auto mb-5 flex flex-col  min-h-[400px] ">
        <GoogleButton />
        <form
          onSubmit={onSubmit}
          className="flex flex-col px-4 lg:px-6 bg-[#F5F9FF] items-center justify-center w-full pb-4"
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
            type="string"
            placeholder="enter phone number"
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
          <div className="w-full flex items-end justify-end">
            <Button
              title={isLoading ? 'Loading...' : 'Create account'}
              classNames="w-[220px]  items-end justify-end  mt-4 mr-4 text-[14px] py-3 rounded-[50px]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyerSiginup

BuyerSiginup.getLayout = function getLayout(page: ReactElement) {
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
