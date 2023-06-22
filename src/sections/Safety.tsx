/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const Safety = () => {
  return (
    <div className="min-h-[480px] w-full flex items-center justify-center bg-black">
      <div className="max-w-[1000px]  mx-auto h-full items-center justify-center grid-cols-1 md:grid md:grid-cols-2">
        <div className="flex flex-col ">
          <h2 className="lg:text-[44px] text-[34px] px-4 lg:px-0 mb-4 font-poppins font-[500] text-white lg:leading-[58px]">
            You're In Safe Hand
          </h2>
          <span className="text-white md:pr-4 lg:pl-0 px-4 font-poppins text-[17px] leading-[33px] font-[300]">
            We are building Africa’s most reliable online construction and
            building material marketplace. At Buildadom, the safety of our
            merchants and buyers is of high priority to us.
          </span>
        </div>
        <div className="md:flex hidden h-full p-8 w-full items-center justify-center">
          <img
            src="/assets/shield.png"
            alt="shield"
            className="w-[300px] h-[350px] obbject-cover  "
          />
        </div>
      </div>
    </div>
  )
}

export default Safety
