import { getUserCookie } from '@/hooks/useCookie'
import { useInitializePaymentMutation } from '@/redux/services/buyer.service'
import { useGetCartDetailsQuery } from '@/redux/services/cart.service'
import { useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
import React from 'react'

const Listings = ({
  text,
  value,
  classNames,
}: {
  text: string
  value: string
  classNames?: string
}) => {
  return (
    <div className="flex  items-center py-2 justify-between">
      <span className="text-[15px] font-semibold font-poppins leading-[21px]">
        {text}
      </span>
      <span
        className={`text-[13px] font-semibold font-poppins leading-[21px] ${classNames}`}
      >
        {value}
      </span>
    </div>
  )
}

const PaymentCheckout = ({
  classNames,
  checked,
}: {
  classNames?: string
  checked?: boolean
}) => {
  const { data: info } = useGetCartDetailsQuery()
  const router = useRouter()
  const token = getUserCookie('user')
  const [initializePayment, { isLoading }] = useInitializePaymentMutation()
  const handleClick = () => {
    if (token) {
      router.push('/checkout')
    } else {
      router.push('/login')
    }
  }
  const { total, shippingPrice } = useTypedSelector((state) => state.stepper)
  const payNow = async () => {
    try {
      const result = await initializePayment({
        amount: 2000,
        order_id: info.order_id,
      }).unwrap()
      window.open(result, '_self')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className={`w-[35%] flex flex-col  bg-[#F5F7FF] min-h-[300px] h-full p-6 ${classNames}`}
    >
      <h1 className="font-poppins text-[24px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
        Summary
      </h1>
      <div className="flex mt-4 flex-col">
        <Listings text="Subtotals" value={total} />
        {shippingPrice > 0 && (
          <Listings text="Shipping" value={shippingPrice} />
        )}
        <Listings text="Tax" value="#1" />
        <Listings
          text="Order Total"
          value={`#${1 + shippingPrice}`}
          classNames="text-[18px]"
        />
      </div>
      {router.pathname === '/cart' && (
        <Button
          onClick={handleClick}
          title="Proceed to Checkout"
          classNames="py-[10px] px-[54px] mt-10 w-full rounded-[52px] hover:font-semibold"
        />
      )}
      {checked && (
        <Button
          onClick={payNow}
          title={isLoading ? 'Loading...' : 'Pay Now'}
          classNames="py-[10px] px-[54px] mt-10 w-full rounded-[52px] hover:font-semibold"
        />
      )}
    </div>
  )
}

export default PaymentCheckout
