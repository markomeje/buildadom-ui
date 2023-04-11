/* eslint-disable @next/next/no-img-element */
import React from 'react'

const FirstSection = () => {
  return (
    <div className="min-h-[500px] mt-16 flex  flex-col items-center justify-center w-full">
      <div className="grid md:grid-cols-5  h-full items-center max-w-full md:max-w-[980px] mx-auto justify-center">
        <div className="col-span-1 md:col-span-3 px-2 h-full flex items-center justify-center">
          <img
            src="/assets/smiling-lady.png"
            alt="smiling-lady"
            className="object-fill"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex  md:px-0 px-4 py-4 md:py-0 md:-ml-6 flex-col">
          <span className="font-poppins text-gray-800 text-[18px] leading-[32px]">
            Join manufacturers, distributors and dealers all over the world who
            are taking advantage of digital transformation opportunities to
            change the way they do business - reach customers, sell, take,
            process and fulfill orders.{' '}
          </span>
          <span className="font-poppins text-[16px] leading-[27px]  font-semibold mt-4 mb-2">
            Shop/Stores
          </span>
          <h2 className="font-poppins text-[32px] leading-[36px]  font-semibold ">
            3000+
          </h2>
        </div>
      </div>
    </div>
  )
}

export default FirstSection
