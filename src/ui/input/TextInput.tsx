/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTypedSelector } from '@/redux/store'
import React from 'react'

export type TextProps = {
  placeholder: string
  name: string
  type: string
  title: string
  register: any
  setValue?: any
  error: any
}

const rules = [
  'Minimum of 8 characters*',
  'At least on number chareacter is requried*',
  'A special character is required*',
]

const Input = ({
  placeholder,
  title,
  name,
  type,
  register,
  error,
}: TextProps) => {
  const { validationErrors } = useTypedSelector(
    (state) => state.validationError
  )

  const isErr =
    validationErrors[name] && validationErrors[name].length > 0 ? true : false
  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {title}
      </label>
      <div className="mb-1 flex flex-col -mt-2">
        {name === 'password' &&
          rules.map((rule, index) => (
            <span className="text-red-400 font-poppins text-[12px]" key={index}>
              {rule}
            </span>
          ))}
      </div>
      <input
        className={`w-full border  ${
          isErr ? 'border-red-300' : 'border-[#8C8C8C]'
        } focus:outline-none h-[50px] rounded-[5px] px-4 text-gray-800 placeholder:text-[#8C8C8C] font-poppins`}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${name} is required` })}
      />
      <span className="mt-1 font-poppins text-red-400 text-[13px]">
        {error && error[`${name}`]?.message}
      </span>
      {validationErrors[name] && (
        <p className="font-poppins text-red-400 text-[13px]">
          {validationErrors[name].join(',')}
        </p>
      )}
    </div>
  )
}

export default Input
