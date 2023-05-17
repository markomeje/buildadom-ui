import React from 'react'

type IProps = {
  data: IDriver[]
}

type IDriver = {
  firstname: string
  lastname: string
  phone: string
}

const Driver = ({ firstname, lastname, phone }: IDriver) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#CCCCCC] px-4">
      <div className="flex flex-col">
        <span className="font-poppins font-semibold text-[14px]">{`${firstname} ${lastname}`}</span>
        <span className="font-poppins text-[12px] text-gray-600">{phone}</span>
      </div>
      <button className="w-[110px] h-[36px] flex items-center justify-center bg-red-100 text-[12px] font-poppins text-[#FF4438] rounded-[18px]">
        Remove
      </button>
    </div>
  )
}

const DriverTable = ({ data }: IProps) => {
  return (
    <div className="flex flex-col">
      <div className="h-[39px] mb-3 px-6 flex items-center justify-between bg-[#F5F7FF]">
        <span className="font-poppins font-semibold leading-[16px] text-[14px]">
          Driver Details
        </span>
        <span className="font-poppins font-semibold leading-[16px] text-[14px]">
          Action
        </span>
      </div>
      {data &&
        data.map((detail, index) => {
          return (
            <Driver
              key={index}
              firstname={detail.firstname}
              lastname={detail.lastname}
              phone={detail.phone}
            />
          )
        })}
    </div>
  )
}

export default DriverTable
