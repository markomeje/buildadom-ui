/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import { useGetCitiesQuery } from '@/redux/reducers/strore_reducer'
import React, { useState } from 'react'
import { setCity } from '@/redux/reducers/country_reducer'
import { City } from '@/interface/dashboard'
// import { skipToken } from '@reduxjs/toolkit/dist/query'

interface ISearch {
  name: string
}

const SearchInput = ({ name }: ISearch) => {
  const [value, setValue] = useState<string>('')
  const { country, city } = useAppSelector((state) => state.dashboard)
  const { data, isLoading } = useGetCitiesQuery(country.iso2, {
    skip: country.iso2 !== '',
  })

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        Search City
      </label>
      <div className="flex flex-col relative">
        <input
          className="w-full border  border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4 text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
          type="text"
          value={city ? city : value}
          name={name}
          placeholder="search county city"
          onChange={handleChange}
        />
        {value !== '' && (
          <DropDown
            cities={data as City[]}
            loading={isLoading}
            value={value}
            setValue={setValue}
          />
        )}
      </div>
      <span className="mt-1 font-poppins text-red-400 text-[13px]"></span>
    </div>
  )
}

export default SearchInput

const DropDown = ({
  cities,
  loading,
  value,
  setValue,
}: {
  loading: boolean
  setValue: (value: string) => void
  cities: City[]
  value: string
}) => {
  const dispatch = useAppDispatch()
  const selected = (city: City) => {
    dispatch(setCity(city.name))
    setValue('')
  }
  return (
    <div className="flex flex-col w-full  border shadow-lg rounded-[5px] absolute top-[55px] z-10 bg-white border-gray-400 p-3">
      <div className="flex flex-col max-h-[200px] overflow-y-scroll">
        {loading ? (
          <span>loading...</span>
        ) : cities &&
          cities.filter((city: any) =>
            city.name.toLowerCase().includes(value.toLowerCase())
          ).length === 0 ? (
          <span className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-poppins flex items-start">
            Select A Country
          </span>
        ) : (
          cities &&
          cities
            .filter((city: City) =>
              city.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((city: City, index: number) => (
              <span
                onClick={() => selected(city)}
                key={index}
                className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-poppins flex items-start"
              >
                {city.name}
              </span>
            ))
        )}
      </div>
    </div>
  )
}
