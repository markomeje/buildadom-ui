// import IndividualIDValidation from '@/components/sections/dasboard/auth/forms/IndividualIDValidation'
import { IDValidationStepper } from '@/components/steppers'
import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import UseStepper from '@/hooks/useStepper'
import Dashboard from '@/layout/seller/Dashboard'
import { setStepper } from '@/redux/reducers/step_reducer'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'

const IdVerification = () => {
  const dispatch = useAppDispatch()
  const { step } = useAppSelector((state) => state.step)
  const router = useRouter()
  useEffect(() => {
    if (router.query && router.query.stepper) {
      dispatch(setStepper(router.query.stepper))
    }
  }, [router.query, dispatch])
  return (
    <div className="max-w-[800px] mx-auto py-16">
      <h1 className="font-poppins font-semibold leading-[60px] pb-4 text-center text-[32px] text-bd-black">
        Merchant Id Validation
      </h1>
      {<UseStepper step={step} stepObject={IDValidationStepper} />}
    </div>
  )
}

export default IdVerification

IdVerification.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>
}
