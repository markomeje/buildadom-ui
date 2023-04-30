import React from 'react'
import HomeProducts from './HomeProducts'
import { useAllProductsQuery } from '@/redux/services/general.service'
import StoreImg from '@/components/StoreImg'

const StoreCollections = ({ name, img }: { name: string; img: string }) => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <div className="flex mb-6 items-center">
      <StoreImg name={name} img={img} />
      <div className="flex  ml-4 ">
        <HomeProducts isLoading={isLoading} data={data && data.slice(0, 4)} />
      </div>
    </div>
  )
}

export default StoreCollections
