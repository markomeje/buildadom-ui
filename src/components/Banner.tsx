import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className="w-full my-2 md:my-5 bg-[#F5F7FF] flex items-center flex-col md:flex-row  flex-wrap justify-center py-4">
      <Image
        src="/assets/zip.png"
        width={76}
        height={27}
        alt="banner-img"
        className="w-[40px] lg:w-[76px] mb-3 md:mb-0"
      />
      <span className="text-[12px] lg:text-[18px] text-center font-[400] font-poppins leading-[17px] ,md:ml-4">
        <b>own</b> it now, up to 6 months interest free learn more
      </span>
    </div>
  )
}

export default Banner
