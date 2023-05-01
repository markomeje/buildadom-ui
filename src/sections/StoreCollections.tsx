/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import HomeProducts from './HomeProducts'
import StoreImg from '@/components/StoreImg'
import { useAllStoresQuery } from '@/redux/services/general.service'
const StoreCollections = () => {
  const { data, isLoading } = useAllStoresQuery(5)
  console.log(data, 'datatat')

  return (
    <>
      {data &&
        data.map((store: any, index: number) => {
          return (
            <div className="flex mb-6 items-center" key={index}>
              <StoreImg
                name={store.name}
                img={
                  store.images[0] ? store.images[0].url : '/assets/logo2.png'
                }
              />
              <div className="flex  ml-4 ">
                <HomeProducts
                  isLoading={isLoading}
                  data={store && store.products}
                />
              </div>
            </div>
          )
        })}
    </>
  )
}

export default StoreCollections
