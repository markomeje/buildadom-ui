// import IndividualIDValidation from '@/components/sections/dasboard/auth/forms/IndividualIDValidation'
import UseStepper from '@/hooks/useStepper'
import Dashboard from '@/layouts/Dashboard'
import { IDValidationStepper } from '@/lib/stepper'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
// import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import React, { ReactElement, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useGetValidationDetailsQuery } from '@/redux/services/validation.service'

const IdVerification = () => {
  const { data, isLoading } = useGetValidationDetailsQuery()
  const dispatch = useTypedDispatch()
  const { step } = useTypedSelector((state) => state.stepper)

  useEffect(() => {
    if (!isLoading && data === null) {
      dispatch(setStepper(1))
    } else if (
      (!isLoading && data !== null && data?.image === null) ||
      data?.image === undefined
    ) {
      dispatch(setStepper(2))
    } else {
      dispatch(setStepper(3))
    }
  }, [data, dispatch, isLoading])

  return (
    <div className="max-w-[800px] mx-auto py-16">
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
