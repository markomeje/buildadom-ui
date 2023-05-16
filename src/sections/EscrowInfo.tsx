import React from 'react'
type InfoProps = {
  overlay: string
  bg: string
  icon: string
  title: string
  price: string
}

const Info = ({ overlay, bg, icon, title, price }: InfoProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`${overlay} w-[76px] mr-4 rounded-[17px] mb-5 h-[78px] flex flex-col items-center justify-center`}
      >
        <div
          className={`${bg} w-[45px] rounded-t-[20px] rounded-br-[20px]  h-[45px] flex items-center justify-center `}
        >
          <i className={`${icon} text-white text-[17px]`} />
        </div>
      </div>
      <div className="flex -mt-4 flex-col">
        <span className="text-[14px] font-poppins leading-[21px] font-[500]">
          {title}
        </span>
        <h1 className="text-[28px] font-poppins leading-[32px] font-semibold">
          {price}
        </h1>
      </div>
    </div>
  )
}

const EscrowInfo = () => {
  return (
    <div className="w-full h-[185px] py-4 px-10 flex justify-between mt-6 rounded-md bg-[#F5F7FF] ">
      <Info
        bg="bg-[#FF35C5]"
        overlay="bg-[#EBBDDD]"
        icon="ri-heart-3-fill"
        title="Total Escrow Amount"
        price="$0"
      />
      <Info
        title="Product Release"
        price="0"
        bg="bg-[#0156FF]"
        overlay="bg-[#0156ff66]"
        icon="ri-caravan-fill"
      />
      <Info
        title="Product Pending"
        price="0"
        bg="bg-[#FFA500]"
        overlay="bg-[#ffb80066]"
        icon="ri-global-fill"
      />
    </div>
  )
}

export default EscrowInfo
