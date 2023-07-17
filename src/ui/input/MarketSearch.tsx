import React from 'react'

const ExploreSearch = () => {
  return (
    <div className="relative w-full mx-4 md:mx-0 md:w-[488px]">
      <input
        type="text"
        placeholder="Search products"
        className="w-full rounded-[30px] py-2 border-[2px] pl-3 focus:outline-none border-[#E6E8EC] placeholder:text-gray-400 placeholder:font-poppins text-gray-500 font-poppins placeholder:text-[14px]"
      />
      <div className="absolute w-[30px] h-[30px] right-2 top-[6px]  rounded-[30px]  bg-[#3772FF] flex items-center justify-center">
        <i className="ri-search-2-line text-[16px] text-white"></i>
      </div>
    </div>
  )
}

export default ExploreSearch
