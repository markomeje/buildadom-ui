import Image from 'next/image'
import React from 'react'
import { Rating } from './Product'
import Button from '@/ui/button/Button'

const FavouriteProducts = () => {
  return (
    <div className="flex w-[200px] flex-col mr-6 mb-8">
      <Image
        src={'/assets/paint.png'}
        width={200}
        height={200}
        alt="fav_img"
        className="w-[200px] h-[206px] object-cover"
      />
      <p className="lowercase text-[14px] py-3 leading-[19px] font-poppins">
        EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
      </p>
      <Rating rating={4} review={'3'} />
      <h2 className="text-[18px] leading-[25px] font-poppins pb-3">$499.00</h2>
      <Button
        type="outline"
        title="Track Order"
        classNames="w-full border-bd-blue font-semibold px-6  py-2 text-[13px] mt-2  rounded-[20px]"
      />{' '}
      <Button
        type="outline"
        title="Remove"
        classNames="w-full border-[#FF354C] text-red-600 font-semibold px-6  py-2 text-[13px] mt-2  rounded-[20px]"
      />
    </div>
  )
}

export default FavouriteProducts
