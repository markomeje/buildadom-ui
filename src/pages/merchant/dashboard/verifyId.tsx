import UseStepper from '@/hooks/useStepper'
import Dashboard from '@/layouts/Dashboard'
import { IDValidationStepper } from '@/lib/stepper'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import { getCookie } from 'cookies-next'
import React, { ReactElement, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'

const IdVerification = ({ stepper }: { stepper: number }) => {
  const dispatch = useTypedDispatch()
  const { step } = useTypedSelector((state) => state.stepper)

  useEffect(() => {
    dispatch(setStepper(stepper))
  }, [stepper, dispatch])

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
    const URL = process.env.API_BASE_URL as string
    console.log(URL, 'url')
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
      const parsedData = JSON.parse(token as string)
      store.dispatch(setUser(parsedData))
      const {
        data: { details },
      } = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${parsedData.token}`,
        },
      })
      console.log(details, 'details verified')
      if (details === null) {
        return {
          props: { stepper: 1 },
        }
      } else if (
        (details !== null && details?.image === null) ||
        details.image === undefined
      ) {
        return {
          props: { stepper: 2 },
        }
      } else {
        return {
          props: { stepper: 3 },
        }
      }
    }

    return { props: {} }
  })
