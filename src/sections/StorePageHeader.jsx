import CategoryGroups from '@/components/CategoryBar'
import { useGetProductsCategoriesQuery } from '@/redux/services/store.slice'
import ExploreSearch from '@/ui/input/MarketSearch'
import React from 'react'

const StorePageHeader = () => {
  const { data, isLoading } = useGetProductsCategoriesQuery()

  return (
    <div className="border-b mx-4 mb-4 border-[#CCCCCC] h-[250px]">
      <div className="flex flex-col wrapper h-full">
        <div className="flex items-center h-full justify-between">
          <h1 className="text-[32px] leading-[48px] font-poppins font-[600]">
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
