/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Support = () => {
  return (
    <div className="bg-[#fefeff]  w-full h-[407px]">
      <div className="max-w-[1000px] h-full mx-auto grid grid-cols-2">
        <div className="flex flex-col col-span-1 w-full h-full items-center justify-center">
          <Listings text="Product Support" />
          <Listings text="Our Policy" />
          <Listings text="Our Buyer Guide" />
        </div>
        <div className="support_bg"></div>
      </div>
    </div>
  )
}

export default Support

const Listings = ({ text }: { text: string }) => (
  <div className="w-[347px] h-[56px] flex mb-4 cursor-pointer items-center justify-between pl-[26px] rounded-[6px] border border-[#CCCCCC] pr-[17px]">
    <h2 className="font-[500] font-poppins text-[16px] leading-[24px] text-[#313131]">
      {text}
    </h2>
    <i className="ri-arrow-right-line text-bd-blue text-[20px]"></i>
  </div>
)
