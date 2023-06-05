import BuyerSidebar from '@/components/BuyerSidebar'
import MainLayout from '@/layouts/MainLAyout'
import Image from 'next/image'
import React, { ReactElement } from 'react'

const BuyerDashboard = () => {
  return (
    <BuyerSidebar header="My Dashbaord">
      <div className="flex flex-col w-full">
        <h1 className="font-poppins text-[18px] leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Account Information
        </h1>
        <div className="flex py-6 items-center">
          <Image
            src={'/assets/buyer.png'}
            width={128}
            height={128}
            className="w-[128px] h-[128px] mr-16"
            alt="user_profile"
          />
          <div className="flex flex-col">
            <h2 className="text-[16px] leading-[22px] font-poppins font-[500] pb-4">
              Contact Information
            </h2>
            <p className="font-poppins text-[#666666] text-[16px] leading-[20px] pb-2">
              Alex Driver
            </p>
            <p className="font-poppins text-[#666666] text-[16px] leading-[20px] pb-2">
              example@gmail.comd
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-6 flex-col w-full">
        <h1 className="font-poppins text-[18px] leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Address Book
        </h1>
        <div className="flex py-8 items-center">
          <div className="flex mr-8 w-[300px] flex-col">
            <h2 className="text-[16px] leading-[22px] font-poppins font-[500] pb-4">
              Default Billing Address
            </h2>
            <p className="font-poppins text-[#666666] text-[16px] leading-[20px] pb-2">
              You have not set a default billing address.
            </p>
          </div>
          <div className="flex w-[350px] flex-col">
            <h2 className="text-[16px] leading-[22px] font-poppins font-[500] pb-4">
              Default Shipping Address
            </h2>
            <p className="font-poppins text-[#666666] text-[16px] leading-[20px] pb-2">
              You have not set a default shipping address.
            </p>
          </div>
        </div>
      </div>
    </BuyerSidebar>
  )
}

export default BuyerDashboard

BuyerDashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
