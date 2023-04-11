/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const Safety = () => {
  return (
    <div className="min-h-[480px] w-full flex items-center justify-center bg-black">
      <div className="max-w-[1000px]  mx-auto h-full items-center justify-center  grid grid-cols-2">
        <div className="flex flex-col ">
          <h2 className="text-[44px] mb-4 font-poppins font-[500] text-white leading-[58px]">
            You're In Safe Hands
          </h2>
          <span className="text-white pr-4 font-poppins text-[17px] leading-[30px] font-[300]">
            Experience a 40% boost in computing from last generation. MSI
            Desktop equips the 10th Gen. Intel® Core™ i7 processor with the
            upmost computing power to bring you an unparalleled gaming
            experience. *Performance compared to i7-9700. Specs varies by model.
          </span>
        </div>
        <div className="flex h-full p-8 w-full items-center justify-center">
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
