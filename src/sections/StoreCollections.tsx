/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import HomeProducts from './HomeProducts'
import StoreImg from '@/components/StoreImg'
import { useAllStoresQuery } from '@/redux/services/general.service'
import EmptyState from '@/components/EmptyState'
import { locateImg } from '@/util/locateImg'
const StoreCollections = () => {
  const { data, isLoading } = useAllStoresQuery(5)
  console.log(data, 'datatat')

  return (
    <>
      {data && data.length > 0 ? (
        data.map((store: any, index: number) => {
          return (
            <div className="flex mb-6" key={index}>
              <StoreImg
                name={store.name}
                img={locateImg(store.images && store.images, 'main') as string}
              />
              <div className="flex  ml-4 ">
                <HomeProducts
                  isLoading={isLoading}
                  data={store && store.products && store.products.slice(0, 4)}
                />
              </div>
            </div>
          )
        })
      ) : (
        <div className="py-8 w-full">
          <EmptyState showButton={false} message="NO STORE FOUND" />
        </div>
      )}
    </>
  )
}

export default StoreCollections
