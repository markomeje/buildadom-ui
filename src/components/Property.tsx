import React from 'react'

type IProps = {
  title: string
  content: string
  icon: string
  bg: string
  overlay: string
}

function Properties({ title, content, icon, bg, overlay }: IProps) {
  return (
    <div className="flex mr-6 flex-col card">
      <div
        className={`${overlay} w-[76px] rounded-[17px] mb-5 h-[78px] flex flex-col items-center justify-center`}
      >
        <div
          className={`${bg} w-[45px] rounded-t-[20px] rounded-br-[20px]  h-[45px] flex items-center justify-center `}
        >
          <i className={`${icon} text-white text-[17px]`} />
        </div>
      </div>

      <h2 className="font-poppins leading-[36px] font-[500] text-[24px] mb-1">
        {title}
      </h2>
      <span className="text-[#4e4d4d] pr-2 font-poppins text-[17px] leading-[26px]">
        {content}
      </span>
    </div>
  )
}

export default Properties
