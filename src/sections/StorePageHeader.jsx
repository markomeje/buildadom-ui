import CategoryGroups from '@/components/CategoryBar'
import { useGetProductsCategoriesQuery } from '@/redux/services/merchant'
import ExploreSearch from '@/ui/input/MarketSearch'
import React from 'react'

const StorePageHeader = () => {
  const { data, isLoading } = useGetProductsCategoriesQuery()

  return (
    <div className="border-b lg:mx-4 mb-4 border-[#CCCCCC] h-[220px] pt-4 lg:pt-0 lg:h-[250px]">
      <div className="flex flex-col px-4 wrapper h-full">
        <div className="flex flex-col md:flex-row md:items-center h-full md:justify-between">
          <h1 className="text-[18px] mb-2 pl-2 lg:mx-0 lg:mb-0 md:text-[32px] leading-[48px] font-poppins font-[600]">
            Shop/Store
          </h1>
          <ExploreSearch />
        </div>
        <CategoryGroups data={data} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default StorePageHeader
