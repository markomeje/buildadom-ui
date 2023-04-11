import SignupSuccess from '@/components/sections/dasboard/auth/SignupSuccess'
import Stepper from '@/components/Stepper'
import IndividualDetails from '@/components/steppers/IndividualDetails'
import { useAppSelector } from '@/hooks/useReducer'
import SellerAuth from '@/layout/seller/Auth'
import React, { ReactElement } from 'react'

const RegisterIndividual = () => {
  const { step } = useAppSelector((state) => state.step)
  return (
    <div className="max-w-[900px] mx-auto w-full flex flex-col py-16">
      {step === 3 ? (
        <SignupSuccess />
      ) : (
        <>
          <h1 className="font-poppins font-semibold leading-[60px] text-center text-[40px] text-bd-black">
            Create your Individual business account
          </h1>
          <Stepper />
          <IndividualDetails />
        </>
      )}
    </div>
  )
}

export default RegisterIndividual

RegisterIndividual.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
