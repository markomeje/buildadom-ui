import CheckoutForm from '@/components/CheckoutForm'
import PaymentCheckout from '@/components/PaymentCheckout'
import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement, useEffect, useState } from 'react'
import { setUser, setUserDetails } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useGetUserDetailsQuery } from '@/redux/services/merchant'
import { useGetCartDetailsQuery } from '@/redux/services/cart.service'
import PaystackPayment from '@/components/PaystackPayment'

const ShoppingCart = () => {
  const dispatch = useTypedDispatch()
  const { data } = useGetUserDetailsQuery()
  const { data: info } = useGetCartDetailsQuery()
  const { shippingPrice } = useTypedSelector((state) => state.stepper)
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    if (data) {
      dispatch(setUserDetails(data))
    }
  }, [dispatch, data, info])
  return (
    <div className="wrapper">
      <h1 className="py-8 w-full  font-semibold text-[28px] leading-[40px]">
        {shippingPrice === 0 ? 'Checkout' : 'Select Payment Method'}
      </h1>
      <div className="flex w-full  mb-6">
        {shippingPrice === 0 ? (
          <CheckoutForm />
        ) : (
          <PaystackPayment setChecked={setChecked} checked={checked} />
        )}
        <PaymentCheckout checked={checked} />
      </div>
    </div>
  )
}

export default ShoppingCart

ShoppingCart.getLayout = function getLayout(page: ReactElement) {
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
