/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import CountryList from 'country-list-with-dial-code-and-flag'
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { setCountryCode } from '@/redux/reducer/countryReducer'

// type IProps = {
//   name: string
//   //   register: any
//   //   error: any
// }

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

const PhoneCountryCodeInput = () => {
  const [show, setShow] = useState<boolean>(false)
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
        Phone Number
      </label>
      <div className="w-full flex items-center">
        <div
          onClick={() => setShow(!show)}
          className="w-[30%] cursor-pointer mr-4 mb-3 flex items-center focus:outline-none bg-transparent justify-center  text-[#F3FBF8] font-raleWay text-[18px] border border-[#F3FBF8] rounded-l-[8px] py-[20px] h-[56px]"
        >
          <div
            className=" w-[25px] hidden md:block md:w-[30px] mt-2 h-[25px] md:h-[30px]"
            dangerouslySetInnerHTML={{
              __html: getSvg(data?.code as string) as unknown as string,
            }}
          ></div>
          <span className="text-[12px]  ml-1 font-clash">
            {data?.dial_code}
          </span>
          <i className="ri-arrow-down-s-line text-[20px] font-clash ml-1"></i>
        </div>
      </div>
      {/* Drop-down */}
      {show && (
        <DropDown
          data={CountryList.getAll()}
          setSelected={setSelected}
          setShow={() => setShow(false)}
        />
      )}
    </div>
  )
}

// <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
//           Phone Number
//         </label>
//         <div className="w-full flex items-center">
//           <div
//             onClick={() => setShow(!show)}
//             className="w-[30%] cursor-pointer mr-4 mb-3 flex items-center focus:outline-none bg-transparent justify-center  text-[#F3FBF8] font-raleWay text-[18px] border border-[#F3FBF8] rounded-l-[8px] py-[20px] h-[56px]"
//           >
//             <div
//               className=" w-[25px] hidden md:block md:w-[30px] mt-2 h-[25px] md:h-[30px]"
//               dangerouslySetInnerHTML={{
//                 __html: getSvg(data?.code as string) as unknown as string,
//               }}
//             ></div>
//             <span className="text-[12px]  ml-1 font-clash">
//               {data?.dial_code}
//             </span>
//             <i className="ri-arrow-down-s-line text-[20px] font-clash ml-1"></i>
//           </div>
//           <input
//             className="w-full border  border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4 text-gray-800 placeholder:text-[#8C8C8C] font-poppins"
//             type="text"
//             placeholder="Enter phone number"
//             //   {...register(name, { required: `${name} is required` })}
//           />
//           {/* <span className="mt-1 font-poppins text-red-400 text-[13px]">
//             {/* {error && error[`${name}`]?.message} */}
//           </span> */}
//         </div>
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
    <div className="absolute z-10 border-[#F3FBF8]  h-[150px] rounded-[8px] w-full mt-1 top-[60px] z-10 w-[100%] lg:w-[30%] bg-white">
      <div className="sticky top-0  mb-2">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="search country, city"
          className="w-full h-[20px] leading-[10px] shadow-sm font-clash py-5 text-[12px] text-gray-600 bg-[#fff]  rounded-[4px] outline-none px-4"
        />
        <i className="ri-search-2-line text-[13px] text-gray-400 absolute right-3 top-[10px]"></i>
      </div>
      <div className="px-4 bg-white h-[120px] overflow-scroll">
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
                      <span className="text-[10px] ml-2 font-clash">
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
