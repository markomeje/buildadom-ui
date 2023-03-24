import React from 'react'

type IProps = {
  placeholder: string
  name: string
  type: string
  title: string
}

const Input = ({ placeholder, title, name, type }: IProps) => {
  return (
    <div className="flex my-3 -z-10 flex-col w-full">
      <label className="font-poppins mb-3 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {title}
      </label>
      <input
        className="w-full border relative  border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4 text-[#8C8C8C] font-poppins"
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  )
}

export default Input
