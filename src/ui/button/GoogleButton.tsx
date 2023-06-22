import Image from 'next/image'
import React from 'react'

const GoogleButton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <button className="bg-[#363339] px-10 mb-3 rounded-[30px] py-4 flex items-center ">
        <Image
          src={'/assets/google.png'}
          width={24}
          height={24}
          alt="google-image"
          className="w-[24px] h-[24px] mr-2"
        />
        <span className="text-white font-poppins text-[16px]">
          Sign up with google
        </span>
      </button>
      <div className="flex items-center mb-4 justify-between">
        <div className="w-[200px] h-[2px] bg-[#CCCCCC]"></div>
        <span className="font-poppins mx-2">OR</span>
        <div className="w-[200px] h-[2px] bg-[#CCCCCC]"></div>
      </div>
    </div>
  )
}

export default GoogleButton
