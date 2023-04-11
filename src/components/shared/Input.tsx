/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type IProps = {
  placeholder: string
  name: string
  type: string
  title: string
  register: any
  error: any
}

const Input = ({ placeholder, title, name, type, register, error }: IProps) => {
  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {title}
      </label>
      <input
        className="w-full border  border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4 text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${name} is required` })}
      />
      <span className="mt-1 font-poppins text-red-400 text-[13px]">
        {error && error[`${name}`]?.message}
      </span>
    </div>
  )
}

export default Input
