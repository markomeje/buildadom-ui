import MainLayout from '@/layouts/MainLAyout'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useVerifyPaymentMutation } from '@/redux/services/buyer.service'
import { wrapper } from '@/redux/store'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'

const PaymentVerification = () => {
  const { query } = useRouter()
  const [verifyPayment] = useVerifyPaymentMutation()

  useEffect(() => {
    const paymentVerify = async () => {
      if (query && query.reference) {
        const reference = query.reference
        try {
          const response = await verifyPayment(reference as string)
          console.log(response)
          alert('track order')
        } catch (error) {
          console.log(error)
          alert('error')
        }
      }
    }
    paymentVerify()
  }, [query, verifyPayment])

  return <div></div>
}

export default PaymentVerification

PaymentVerification.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
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
      const parsedData = JSON.parse(token as string)
      store.dispatch(setUser(parsedData))
    }
    return {
      props: {},
    }
  })
