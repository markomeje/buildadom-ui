import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className="w-full my-5 bg-[#F5F7FF] flex items-center justify-center py-4">
      <Image src="/assets/zip.png" width={76} height={27} alt="banner-img" />
      <span className="text-[18px] font-[400] font-poppins leading-[17px] ml-4">
        <b>own</b> it now, up to 6 months interest free learn more
      </span>
    </div>
  )
}

export default Banner
