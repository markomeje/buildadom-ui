import LandingPage from '@/layouts/LandingPage'
import BusinessDetails from '@/sections/BusinessRegistrationDetails'
import React, { ReactElement } from 'react'

const RegisterBusiness = () => {
  return (
    <div className="max-w-[800px] mx-auto w-full flex flex-col py-16">
      <h1 className="font-poppins font-semibold leading-[38px] lg:leading-[60px] text-center text-[28px] lg:text-[40px] text-bd-black">
        Create your business account
      </h1>
      <BusinessDetails />
    </div>
  )
}

export default RegisterBusiness

RegisterBusiness.getLayout = function getLayout(page: ReactElement) {
  return <LandingPage>{page}</LandingPage>
}
