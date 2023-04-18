import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
import React from 'react'

const HomeBanner = () => {
  const router = useRouter()
  const redirect = (link: string) => {
    router.push(link)
  }
  return (
    <div className="wrapper ">
      <div className="w-full h-[60vh] lg:h-[328px] bg-home-banner px-6 lg:px-0 flex flex-col justify-center items-center">
        <h2 className="w-full lg:w-[501px] font-poppins font-semibold lg:leading-[48px] text-[32px] lg:text-[36px] text-white text-center mx-auto">
          Bringing the market to the customer
        </h2>
        <div className="flex lg:flex-row w-full flex-col items-center mt-7 justify-center">
          <Button
            title="Buy from Buildadom"
            classNames="bg-bd-blue mb-5 lg:mb-0 w-[280px] lg:w-[191px] h-[44px] mr-4 rounded-[50px] py-[8px] px-[26px] text-white font-poppins text-[13px]"
          />
          <button
            className="bg-white font-semibold border-none text-bd-blue w-[280px] lg:w-[191px] h-[44px] rounded-[50px]  py-[8px] px-[26px] font-poppins text-[13px]"
            onClick={() => redirect('/merchant')}
          >
            Sell On Buildadom
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
