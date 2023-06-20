/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from '@/interface/general.interface'
import { setCity } from '@/redux/reducer/countryReducer'
import { useGetCitiesQuery } from '@/redux/services/merchant'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React, { useEffect, useState } from 'react'

interface ISearch {
  name: string
}

const SearchInput = ({ name }: ISearch) => {
  const [value, setValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const { country } = useTypedSelector((state) => state.dashboard)
  const { data, isLoading } = useGetCitiesQuery(country.iso2, {
    skip: country.iso2 === '',
  })

  const handleChange = (e: any) => {
    setValue(e.target.value)
    setOpen(true)
  }

  useEffect(() => {
    setValue('')
  }, [country])

  return (
    <div className="flex my-3  flex-col w-full">
      <label className="font-poppins mb-2 text-[#333333] font-semibold leading-[27px] star text-[14px]">
        Search City
      </label>
      <div className="flex flex-col relative">
        <input
          className="w-full border  border-[#8C8C8C] focus:outline-none h-[50px] rounded-[5px] px-4 text-gray-500 placeholder:text-[#8C8C8C] font-poppins"
          type="text"
          value={value}
          name={name}
          placeholder="search county city"
          onChange={handleChange}
        />
        {open && (
          <DropDown
            setOpen={setOpen}
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
  setOpen,
}: {
  loading: boolean
  setValue: (value: string) => void
  setOpen: (value: boolean) => void
  cities: City[]
  value: string
}) => {
  const dispatch = useTypedDispatch()
  const selected = (city: City) => {
    dispatch(setCity(city.name))
    setValue(city.name)
    setOpen(false)
  }
  const { country } = useTypedSelector((state) => state.dashboard)
  const close = () => {
    setOpen(false)
    console.log('closed')
  }

  return (
    <div className="flex flex-col w-full  border shadow-lg rounded-[5px] absolute top-[55px] z-10 bg-white border-gray-400 p-3">
      <div className="flex flex-col max-h-[200px] overflow-y-scroll">
        {loading && country.iso2 === '' && (
          <span className="text-gray-400 font-poppins p-3" onClick={close}>
            Select A County
          </span>
        )}
        {loading && country.iso2 !== '' ? (
          <span className="text-gray-400 font-poppins p-3">loading...</span>
        ) : cities &&
          cities.filter((city: any) =>
            city.name.toLowerCase().includes(value.toLowerCase())
          ).length === 0 ? (
          <span
            className="py-2 text-gray-500 cursor-pointer w-[98%] hover:bg-blue-100 rounded-md mb-1 px-2 font-poppins flex items-start"
            onClick={close}
          >
            No city found
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
