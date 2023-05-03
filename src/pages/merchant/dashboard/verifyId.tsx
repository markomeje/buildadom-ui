// import IndividualIDValidation from '@/components/sections/dasboard/auth/forms/IndividualIDValidation'
import UseStepper from '@/hooks/useStepper'
import Dashboard from '@/layouts/Dashboard'
import { IDValidationStepper } from '@/lib/stepper'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import React, { ReactElement, useEffect } from 'react'
import { GetServerSideProps } from 'next'

const IdVerification = () => {
  const dispatch = useTypedDispatch()
  const { step } = useTypedSelector((state) => state.stepper)
  const router = useRouter()
  useEffect(() => {
    if (router.query && router.query.stepper) {
      dispatch(setStepper(parseInt(router.query.stepper as string)))
    }
  }, [router.query, dispatch])
  return (
    <div className="max-w-[800px] mx-auto py-16">
      <h1 className="font-poppins font-semibold leading-[60px] pb-4 text-center text-[32px] text-bd-black">
        Merchant ID Validation
      </h1>
      {<UseStepper step={step} stepObject={IDValidationStepper} />}
    </div>
  )
}

export default IdVerification

IdVerification.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if (!token) {
      return {
        redirect: {
          destination: '/merchant/login',
          permanent: false,
        },
      }
    }
    if (token) {
      store.dispatch(setUser(JSON.parse(token as string)))
    }
    return {
      props: {},
    }
  })
