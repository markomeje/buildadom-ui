import React from 'react'
import Button from '@/ui/button/Button'
import Logo from '@/ui/general/Logo'
import info from '@/util/info'

function Footer() {
  return (
    <div className="bg-[#020203] w-full min-h-[500px] flex items-center">
      <div className="w-full lg:max-w-[1250px] mx-auto grid py-20  px-4 lg:px-0 lg:grid-cols-6">
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex mb-3 lg:mb-6 items-center">
            <Logo img="/assets/logo_white.svg" />
          </div>
          <h2 className="font-poppins text-white font-[500] mb-2 text-[22px] md:text-[28px] leading-[37px]">
            Sign Up To Our Newsletter
          </h2>
          <span className="font-poppins font-[300] text-white text-[14px] md:text-[16px] leading-[21px]">
            Be the first to hear about the latest offers.
          </span>
          <form className="mt-8 flex-col flex item-center">
            <input
              placeholder="Enter Email"
              type={'text'}
              className="w-full lg:w-[400px] bg-transparent border-2 placeholder:text-gray-200 mr-4 border-white focus:outine-none h-[50px] text-gray-200 rounded-[5px] font-poppins text-[18px] px-3 "
            />
            <Button
              title="subscirbe"
              classNames="w-full lg:w-[400px] h-[50px] rounded-[10px] mt-4"
            />
          </form>
        </div>
        <div className="col-span-1 pt-8 md:pt-0 flex flex-col">
          <span className="text-[#ffffff80] mb-4 font-poppins text-[14px] font-bold">
            Information
            <div className="flex mt-4 flex-col">
              {info.map((x, i) => (
                <span
                  key={i}
                  className="text-[13px] capitalize py-1 lg:py-2 font-poppins text-gray-200"
                >
                  {x}
                </span>
              ))}
            </div>
          </span>
        </div>
        <div className="col-span-1 lg:col-span-2 md:ml-8 flex flex-col">
          <span className="text-[#ffffff80]   font-poppins text-[14px] font-bold">
            Address
          </span>
          <span className="w-[300px] mt-4 text-[14px] lg:text-[18px] font-poppins text-gray-200">
            Address: #56 Coal City Garden Estate, Enugu <br className="mb-2" />{' '}
            Phone: 08119736227
            <br className="mb-2" /> Email: office@buildadom.com
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
