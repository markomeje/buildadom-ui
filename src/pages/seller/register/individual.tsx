import IndividualDetails from '@/components/steppers/IndividualDetails'
import SellerAuth from '@/layout/seller/Auth'
import React, { ReactElement } from 'react'

const RegisterIndividual = () => {
  return (
    <div className="max-w-[900px] mx-auto w-full flex flex-col py-16">
      <h1 className="font-poppins font-semibold leading-[60px] text-center text-[40px] text-bd-black">
        Create your Individual business account
      </h1>
      <IndividualDetails />
    </div>
  )
}

export default RegisterIndividual

RegisterIndividual.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
