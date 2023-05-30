import CartDetails from '@/components/CartDetails'
import PaymentCheckout from '@/components/PaymentCheckout'
import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement } from 'react'

const ShoppingCart = () => {
  return (
    <div className="wrapper">
      <h1 className="py-12 font-semibold text-[32px] leading-[40px]">
        Shopping Cart
      </h1>
      <div className="flex mb-6">
        <CartDetails />
        <PaymentCheckout />
      </div>
    </div>
  )
}

export default ShoppingCart

ShoppingCart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
