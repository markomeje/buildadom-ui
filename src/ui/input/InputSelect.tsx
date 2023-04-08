/* eslint-disable @typescript-eslint/no-explicit-any */
// import { IndividualIDValidationSchema } from '@/schema/auth/mechant'
// import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useController } from 'react-hook-form'
import Select from 'react-select'

const options = [
  { value: 'drivers liscence', label: 'Dirviers Liscence' },
  { value: 'voters card', label: 'Voters Card' },
  { value: 'international passport', label: 'International Passport' },
  { value: 'national identity card', label: 'National Identity Card' },
]

const InputSelect = ({ control, errors, data }: any) => {

  const {
    field: { value: idValue, onChange: typeOnChange, ...restTypeField },
  } = useController({ name: 'id_type', control })
  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        ID type
      </label>
      <Select
        className="w-full  focus:outline-none h-[50px] rounded-[5px] text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
        placeholder="select type"
        isClearable
        // styles={customStyles}
        options={data}
        value={idValue ? options.find((x) => x.value === idValue) : idValue}
        onChange={(option) => typeOnChange(option ? option.value : option)}
        {...restTypeField}
      />
      {errors.id_type && (
        <p className="mt-1 font-poppins text-red-400 text-[13px]">
          {errors.id_type.message}
        </p>
      )}
    </div>
  )
}

export default InputSelect
