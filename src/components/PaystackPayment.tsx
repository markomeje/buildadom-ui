import Image from 'next/image'
import React from 'react'

const PaystackPayment = ({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: (value: boolean) => void
}) => {
  return (
    <div className="w-full basis-[65%]  mr-10">
      <div className="w-[80%] py-4 px-6 flex border-2 rounded-[10px] border-gray-300">
        <input
          type="radio"
          className="mr-4 bg-red-100 border-red-300 text-red-500 focus:ring-red-200 peer"
          onChange={() => setChecked(!checked)}
          checked={checked}
        />
        <Image
          src={'/assets/paystack.svg'}
          alt="paystack_logo"
          width={250}
          height={100}
          className="w-[250px] h-[100px]"
        />
      </div>
    </div>
  )
}

export default PaystackPayment
