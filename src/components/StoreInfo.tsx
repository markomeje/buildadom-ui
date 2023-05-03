import React from 'react'

type IProps = {
  name: string
  description: string
  city: string
  address: string
}

const StoreInfo = ({ name, description, city, address }: IProps) => {
  return (
    <div className="flex flex-col mt-4 lg:mt-0 w-full lg:w-auto justify-center">
      <h1 className="font-semibold font-poppins lg:pb-2 text-[18px] lg:text-[24px] leading-[30px] lg:leading-[38px]">
        {name}
      </h1>
      <p className=" w-full lg:w-[550px] font-poppins text-[15px]  leading-[27px]">
        {description}
      </p>
      <div className="w-[262px] my-4 bg-[#CCCCCC] h-[1px]"></div>
      <div className="flex items-center justify-center">
        <i className="ri-map-pin-2-fill mr-1 text-[18px] text-bd-blue"></i>
        <span className="w-[550px] font-poppins text-[16px]  leading-[27px]">
          {`${address}  ${city}`}
        </span>
      </div>
    </div>
  )
}

export default StoreInfo
