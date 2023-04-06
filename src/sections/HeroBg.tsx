/* eslint-disable @next/next/no-img-element */
import Button from '@/ui/button/Button'
import React from 'react'

function HeroBg() {
  return (
    <div className="min-h-[75vh] w-full relative">
      <div className="px-5 absolute  bottom-0 left-0 right-0">
        <div className="flex max-w-[800px] h-full items-center justify-center -mb-6  mx-auto w-full flex-col ">
          <h1 className="font-poppins text-center font-semibold text-[28px] leading-[50px]">
            <span className="text-[#E9A426]">Buildadom</span> is an ecosystem of
            innovative solutions for the building and construction industry
          </h1>
          <span className="text-center text-[#090909]  font-poppins text-[22px] justify-center flex items-center leading-[34px] px-12 pt-6 pb-4">
            Sign up now and be among the first people to enjoy our amazing
            features when we launch
          </span>
          <div className="flex w-full gap-x-6 mt-4 items-center justify-center">
            <Button
              title="Sign Up Now"
              classNames="py-[18px] px-[54px] w-[230px] rounded-[82px]"
            />
            <Button
              title="Learn More"
              type="outlined"
              classNames="py-[18px] px-[54px] w-[230px] rounded-[82px]"
            />
          </div>
        </div>
        <img src="/assets/sel-bg.png" alt="bg-image" className="w-full" />
      </div>
    </div>
  )
}

export default HeroBg
