import Button from '@/ui/button/Button'
import React from 'react'

const HomeBanner = () => {
  return (
    <div className="wrapper ">
      <div className="w-full h-[328px] bg-home-banner flex flex-col justify-center items-center">
        <h2 className="w-[501px] font-poppins font-semibold leading-[48px] text-[36px] text-white text-center mx-auto">
          Bringing the market to the customer
        </h2>
        <div className="flex items-center mt-7 justify-center">
          <Button
            title="Buy from Buildadom"
            classNames="bg-bd-blue w-[191px] h-[44px] mr-4 rounded-[50px] py-[8px] px-[26px] text-white font-poppins text-[13px]"
          />
          <button className="bg-white font-semibold border-none text-bd-blue w-[191px] h-[44px] rounded-[50px]  py-[8px] px-[26px] font-poppins text-[13px]">
            Sell On Buildadom
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
