import { useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import Link from 'next/link'
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

const PaymentCheckout = ({ classNames }: { classNames?: string }) => {
  const { total } = useTypedSelector((state) => state.stepper)
  console.log('total:', total)
  return (
    <div
      className={`w-[35%] flex flex-col  bg-[#F5F7FF] h-[350px] p-6 ${classNames}`}
    >
      <h1 className="font-poppins text-[24px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
        Summary
      </h1>
      <div className="flex mt-4 flex-col">
        <Listings text="Subtotals" value={total} />
        {/* <Listings text="Shipping" value="$20,000" /> */}
        <Listings text="Tax" value="$1" />
        <Listings
          text="Order Total"
          value="$100,000"
          classNames="text-[18px]"
        />
      </div>
      <Link href={'/checkout'}>
        <Button
          title="Proceed to Checkout"
          classNames="py-[10px] px-[54px] mt-10 w-full rounded-[52px] hover:font-semibold"
        />
      </Link>
    </div>
  )
}

export default PaymentCheckout
