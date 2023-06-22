/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country } from '@/interface/general.interface'
import { setBirthCountry } from '@/redux/reducer/countryReducer'
import { useGetCountriesQuery } from '@/redux/services/merchant'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'
type IProps = {
  title: string
  error?: any
}

const SelectCountryOfBirth = ({ title }: IProps) => {
  const [show, setShow] = useState<boolean>(false)
  const dispatch = useTypedDispatch()
  const { data, isLoading, isSuccess } = useGetCountriesQuery()
  const { birth_country } = useTypedSelector((state) => state.dashboard)
  const toggle = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (data) {
      const result = data.find((country) => country.iso2 === 'NG')
      if (result) {
        dispatch(setBirthCountry(result))
      }
    }
  }, [data, dispatch])

  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {title}
      </label>
      <div className="flex flex-col relative">
        <div
          onClick={toggle}
          className="w-full cursor-pointer flex items-center justify-between border border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4"
        >
          <span className="text-[#838383] leading-[20px] text-[14px] font-poppins">
            {birth_country && birth_country.name !== ''
              ? `${birth_country.name}, ${birth_country.capital}`
              : 'Loading Countries...'}
          </span>
          <i
            className={`ri-arrow-${
              show ? 'up' : 'down'
            }-s-line cursor-pointer text-black`}
          ></i>
        </div>
        {show && (
          <DropDown
            countries={isSuccess && data}
            loading={isLoading}
            setShow={setShow}
          />
        )}
      </div>
      {/* <span className="mt-1 font-poppins text-red-400 text-[13px]">
        {error && error[`${name}`]?.message}
      </span> */}
    </div>
  )
}

export default SelectCountryOfBirth

const DropDown = ({
  countries,
  loading,
  setShow,
}: {
  countries: Country[] | boolean
  loading: boolean
  setShow: (value: boolean) => void
}) => {
  const dispatch = useTypedDispatch()
  const [input, setInput] = useState<string>('')
  const handleChange = (e: any) => {
    setInput(e.target.value)
  }
  const selected = (country: Country) => {
    dispatch(setBirthCountry(country))
    setShow(false)
  }
  return (
    <div className="flex flex-col w-full  border shadow-lg rounded-[5px] absolute top-[55px] z-10 bg-white border-gray-400 p-3">
      <div className="relative w-full mb-2">
        <input
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="search country, city"
          className="w-full h-[20px] leading-[10px] border border-gray-300 font-poppins py-5 text-[14px] text-gray-600  rounded-[4px] outline-none px-4"
        />
        <i className="ri-search-2-line text-[16px] text-gray-400 absolute right-3 top-[10px]"></i>
      </div>
      <div className="flex flex-col max-h-[200px] overflow-y-scroll">
        {loading ? (
          <span className="text-gray-400 font-poppins p-3">loading...</span>
        ) : countries &&
          (countries as Country[]).filter((x: Country) =>
            x.name.toLowerCase().includes(input.toLowerCase())
          ).length === 0 ? (
          <span className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-clash flex items-start">
            No Result Found
          </span>
        ) : (
          countries &&
          (countries as Country[])
            .filter((x: Country) =>
              x.name.toLowerCase().includes(input.toLowerCase())
            )
            .map((country: Country, index: number) => (
              <span
                onClick={() => selected(country)}
                key={index}
                className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-poppins flex items-start"
              >
                {country.name}, {country.capital}
              </span>
            ))
        )}
      </div>
    </div>
  )
}
