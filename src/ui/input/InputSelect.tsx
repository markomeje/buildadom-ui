/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useController } from 'react-hook-form'
import Select from 'react-select'

const InputSelect = ({ control, errors, data, label, name }: any) => {
  const {
    field: { value: idValue, onChange: typeOnChange, ...restTypeField },
  } = useController({ name: name, control })
  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {label}
      </label>
      <Select
        className="w-full  focus:outline-none h-[50px] rounded-[5px] text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
        placeholder="select type"
        isClearable
        options={data}
        value={idValue ? data?.find((x: any) => x.value === idValue) : idValue}
        onChange={(option) => typeOnChange(option ? option.value : option)}
        {...restTypeField}
      />
      {errors[name] && (
        <p className="mt-1 font-poppins text-red-400 text-[13px]">
          {errors[name].message}
        </p>
      )}
    </div>
  )
}

export default InputSelect

export const CategorySelect = ({ control, errors, data, label, name }: any) => {
  const {
    field: { value: idValue, onChange: typeOnChange, ...restTypeField },
  } = useController({ name: name, control })
  console.log(idValue, 'valuee')
  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {label}
      </label>
      <Select
        className="w-full  focus:outline-none h-[50px] rounded-[5px] text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
        placeholder="select type"
        isClearable
        options={data}
        value={idValue ? data?.find((x: any) => x.value === idValue) : idValue}
        onChange={(option) => typeOnChange(option ? option.value : option)}
        {...restTypeField}
      />
      {errors[name] && (
        <p className="mt-1 font-poppins text-red-400 text-[13px]">
          {errors[name].message}
        </p>
      )}
    </div>
  )
}
