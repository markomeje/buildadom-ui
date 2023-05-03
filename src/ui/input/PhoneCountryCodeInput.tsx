/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import CountryList from 'country-list-with-dial-code-and-flag'
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { setCountryCode } from '@/redux/reducer/countryReducer'
import { TextProps } from './TextInput'

export type IPhone = {
  dial_code: string
  flag: any
  code: string
  name: string
}

const getSvg = (country: string) => {
  let flagSvg
  const flag = CountryList.findOneByCountryCode(country)
  if (flag) {
    flagSvg = CountryFlagSvg[flag.code as never]
  }
  return flagSvg
}

const PhoneCountryCodeInput = ({
  register,
  error,
  name,
  placeholder,
  type,
  title,
}: TextProps) => {
  const [show, setShow] = useState<boolean>(false)
  const { validationErrors } = useTypedSelector(
    (state) => state.validationError
  )
  const isErr =
    validationErrors[name] && validationErrors[name].length > 0 ? true : false
  const [selected, setSelected] = useState<string>('+234')
  const { countryCode: data } = useTypedSelector((state) => state.dashboard)
  const dispatch = useTypedDispatch()
  useEffect(() => {
    const foundCountry = CountryList.findOneByDialCode(selected)
    if (foundCountry) dispatch(setCountryCode(foundCountry))
  }, [dispatch, selected])

  return (
    <div className="flex  relative my-3 flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        {title}
      </label>
      <div className="w-full flex items-center">
        <div
          onClick={() => setShow(!show)}
          className={`w-[25%] cursor-pointer mr-2  flex items-center focus:outline-none bg-transparent justify-center  text-gray-800 font-raleWay text-[18px] border  rounded-l-[8px] h-[50px] ${
            isErr ? 'border-red-400' : ' border-[#8C8C8C]'
          }`}
        >
          <div
            className=" w-[25px] hidden md:block md:w-[30px] mt-2 h-[25px] md:h-[30px]"
            dangerouslySetInnerHTML={{
              __html: getSvg(data?.code as string) as unknown as string,
            }}
          ></div>
          <span className="ml-1 font-clash py-5 text-[12px] text-gray-600">
            {data?.dial_code}
          </span>
          <i className="ri-arrow-down-s-line text-[20px] font-clash ml-1"></i>
        </div>
        <input
          className={`w-full border block   ${
            isErr ? 'border-red-300' : 'border-[#8C8C8C]'
          } focus:outline-none h-[50px] rounded-r-[5px] px-4 text-gray-800 placeholder:text-[#8C8C8C] font-poppins`}
          type={type}
          placeholder={placeholder}
          {...register('phone', { required: `${name} is required` })}
        />
      </div>
      {/* Drop-down */}
      {show && (
        <DropDown
          data={CountryList.getAll()}
          setSelected={setSelected}
          setShow={() => setShow(false)}
        />
      )}
      <span className="mt-1 block font-poppins text-red-400 text-[13px]">
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

export default PhoneCountryCodeInput

const DropDown = ({
  data,
  setSelected,
  setShow,
}: {
  data: IPhone[]
  setSelected: (value: string) => void
  setShow: (value: boolean) => void
}) => {
  const handleClick = (value: string) => {
    setSelected(value)
    setShow(false)
  }
  const [input, setInput] = useState<string>('')
  return (
    <div className="absolute z-10 h-[250px] rounded-[8px] w-full mt-1 top-[100px] lg:w-[30%] bg-white">
      <div className="sticky top-0  mb-2">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="search country, city"
          className="w-full h-[20px] leading-[10px] border-gray-200 border-b-2 font-poppins py-5 text-[12px] text-gray-600 bg-[#fff]  rounded-[4px] outline-none px-4"
        />
        <i className="ri-search-2-line text-[13px] text-gray-400 absolute right-3 top-[10px]"></i>
      </div>
      <div className="px-4 bg-white h-[230px] overflow-y-scroll">
        {data.length > 0 &&
        data.filter((x) => x.name.toLowerCase().includes(input.toLowerCase()))
          .length === 0 ? (
          <span className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-clash flex items-start">
            No Result Found
          </span>
        ) : (
          data.length > 0 &&
          data
            .filter((x) => x.name.toLowerCase().includes(input.toLowerCase()))
            .map((country, index) => {
              const flagSvg = getSvg(country.code)

              return (
                <div key={index}>
                  {flagSvg && (
                    <div
                      className="flex py-[6px] cursor-pointer items-center"
                      onClick={() => {
                        handleClick(country.dial_code)
                      }}
                    >
                      <div className="w-[23px] h-[23px] cursor-pointer cursopointer rounded-[24px]">
                        <div
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: flagSvg }}
                        ></div>
                      </div>
                      <span className="ml-2  font-poppins text-[10px] text-gray-600">
                        <span className="font-500 mr-1">{country.name}</span>(
                        {country.dial_code})
                      </span>
                    </div>
                  )}
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
