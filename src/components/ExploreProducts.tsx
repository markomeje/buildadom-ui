import React from 'react'

const DropSearch = ({ header, text }: { header: string; text: string }) => {
  return (
    <div className="min-w-[176px] mr-2 h-[50px] flex items-center justify-center border-[2px] border-[#CCCCCC] rounded-[2px]">
      <b className="text-[13px] font-semibold font-poppins">{header}</b>{' '}
      <span className="text-[14px] font-[500] font-poppins">{text}</span>
      <i className="ri-arrow-drop-right-line"></i>
    </div>
  )
}

const ExploreProducts = () => {
  return (
    <div className="w-full">
      <div className="items-center flex">
        <DropSearch header="Sort By:" text="All" />
        <DropSearch header="Sort By:" text="All" />
      </div>
    </div>
  )
}

export default ExploreProducts
