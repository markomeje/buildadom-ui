/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import LandingPage from '@/layouts/LandingPage'
import { wrapper } from '@/redux/store'
import Button from '@/ui/button/Button'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Register = () => {
  const router = useRouter()
  const redirect = (path: string) => {
    router.push(path)
  }
  return (
    <div className="grid grid-cols-2 w-full h-[600px]">
      <div className="col-span-1 w-full h-[600px]">
        <img
          src="/assets/man_smile.png"
          alt="smiling_man"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-1 flex items-center justify-center ">
        <div className="min-h-[400px]  w-[550px] flex-col flex items-center justify-center ">
          <img src="/assets/frame.png" alt="frame_image" className="mb-6" />
          <h1 className="font-poppins text-[#020202] text-center mb-3 w-full font-semibold text-[40px] leading-[50px]">
            Welcome to buildadom
          </h1>
          <span className="text-center font-poppins text-[18px] leading-[27px] px-14">
            Choose method of registration to proceed with creatng your account
            with us.
          </span>
          <Button
            title="Register as an individual"
            classNames="w-full my-4 mt-10 py-[14px] px-[51px] rounded-[50px]"
            onClick={() => redirect('/register/individual')}
          />
          <Button
            title="Register as an business"
            classNames="w-full  py-[14px] px-[51px] rounded-[50px]"
            onClick={() => redirect('/register/business')}
          />
        </div>
      </div>
    </div>
  )
}

export default Register

Register.getLayout = function getLayout(page: ReactElement) {
  return <LandingPage>{page}</LandingPage>
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if(token) {
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
