import Stepper from '@/components/Stepper'
import { AuthStepper } from '@/components/steppers'
import { useAppSelector } from '@/hooks/useReducer'
import UseStepper from '@/hooks/useStepper'
import SellerAuth from '@/layout/seller/Auth'
import React, { ReactElement } from 'react'

const RegisterBusiness = () => {
  const { step } = useAppSelector((state) => state.step)
  return (
    <div className="max-w-[800px] mx-auto w-full flex flex-col py-16">
      <h1 className="font-poppins font-semibold leading-[60px] text-center text-[40px] text-bd-black">
        Create your business account
      </h1>
      <Stepper className="max-w-[500px] mx-auto" />
      <UseStepper step={step} stepObject={AuthStepper} />
    </div>
  )
}

export default RegisterBusiness

RegisterBusiness.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
