import { useGetProductsCategoriesQuery } from '@/redux/services/store.slice'
import React, { useState } from 'react'

const ExploreFilter = () => {
  const [expandCategory, setExpandCategory] = useState<boolean>(true)
  const toggle = () => setExpandCategory(!expandCategory)
  const { data, isLoading } = useGetProductsCategoriesQuery()

  return (
    <div className="w-[235px]">
      <h1 className="text-[32px] leading-[48px] font-poppins font-semibold">
        Market Place
      </h1>
      <div className="w-full bg-[#F5F7FF] py-3 px-6 mt-4 min-h-[80px]">
        <h2 className="w-full py-3 font-poppins font-semibold text-[16px] leading-[24px]">
          Filters
        </h2>
        <div className="w-full">
          <div className="w-full items-center justify-between flex">
            <h2 className="w-full py-3  font-semibold font-poppins text-[16px] leading-[24px]">
              Category
            </h2>
            <i
              className={`ri-arrow-drop-${
                expandCategory ? 'down' : 'right'
              }-line cursor-pointer text-[24px]`}
              onClick={toggle}
            ></i>
          </div>
          {expandCategory && isLoading ? (
            <span>Loading...</span>
          ) : (
            expandCategory &&
            data &&
            data.map((category, index) => (
              <span
                key={index}
                className="block font-poppins text-[13px] leading-[31px] py-1 cursor-pointer hover:font-semibold"
              >
                {category.label}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreFilter
