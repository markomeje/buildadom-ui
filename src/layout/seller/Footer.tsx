import Logo from '@/components/Logo'
import Button from '@/components/shared/Button'
import info from '@/utils/info'
import React from 'react'

function Footer() {
  return (
    <div className="bg-[#020203] w-full min-h-[500px] flex items-center">
      <div className="max-w-[1250px] mx-auto grid py-20 w-full grid-cols-6">
        <div className="col-span-3 flex flex-col">
          <div className="flex mb-6 items-center">
            <Logo />
            <h1 className="font-poppins text-white font-[500] text-[40px] leading-[53px] ml-3">
              House Depot
            </h1>
          </div>
          <h2 className="font-poppins text-white font-[500] mb-2 text-[28px] leading-[37px]">
            Sign Up To Our Newsletter
          </h2>
          <span className="font-poppins font-[300] text-white text-[16px] leading-[21px]">
            Be the first to hear about the latest offers.
          </span>
          <form className="mt-8 flex-col flex item-center">
            <input
              placeholder="Enter Email"
              type={'text'}
              className="w-[400px] bg-transparent border-2 placeholder:text-gray-200 mr-4 border-white focus:outine-none h-[50px] text-gray-200 rounded-[5px] font-poppins text-[18px] px-3 "
            />
            <Button
              title="subscirbe"
              classNames="w-[400px] h-[50px] rounded-[10px] mt-4"
            />
          </form>
        </div>
        <div className="col-span-1 flex flex-col">
          <span className="text-[#ffffff80] mb-4 font-poppins text-[14px] font-bold">
            Information
            <div className="flex mt-4 flex-col">
              {info.map((x, i) => (
                <span
                  key={i}
                  className="text-[13px] capitalize py-2 font-poppins text-gray-200"
                >
                  {x}
                </span>
              ))}
            </div>
          </span>
        </div>
        <div className="col-span-2 ml-8 flex flex-col">
          <span className="text-[#ffffff80]   font-poppins text-[14px] font-bold">
            Address
          </span>
          <span className="w-[300px] mt-4 font-poppins text-gray-200">
            Address Address: 1234 Street Adress City Address, 1234 Phones: (00)
            1234 5678 We are open: Monday-Thursday: 9:00 AM - 5:30 PM Friday:
            9:00 AM - 6:00 PM Saturday: 11:00 AM - 5:00 PM E-mail:
            shop@email.com
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
