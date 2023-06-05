import CheckoutForm from '@/components/CheckoutForm'
import PaymentCheckout from '@/components/PaymentCheckout'
import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement } from 'react'

const ShoppingCart = () => {
  return (
    <div className="wrapper">
      <h1 className="py-12 w-full  font-semibold text-[32px] leading-[40px]">
        Checkout
      </h1>
      <div className="flex w-full  mb-6">
        <CheckoutForm />
        <PaymentCheckout />
      </div>
    </div>
  )
}

export default ShoppingCart

ShoppingCart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
