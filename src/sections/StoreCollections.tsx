/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import HomeProducts from './HomeProducts'
import StoreImg from '@/components/StoreImg'
import { useAllStoresQuery } from '@/redux/services/general.service'
import EmptyState from '@/components/EmptyState'
import { locateImg } from '@/util/locateImg'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
const StoreCollections = () => {
  const { data, isLoading, isSuccess } = useAllStoresQuery(5)
  console.log(data, 'datatat')

  return (
    <>
      {isLoading && <ProductSkeleton amount={5} className="lg:grid-cols-5" />}
      {isSuccess && data.length > 0 ? (
        data.map((store: any, index: number) => {
          return (
            <div className="flex mb-6" key={index}>
              <StoreImg
                name={store.name}
                img={locateImg(store.images && store.images, 'logo') as string}
              />
              <div className="flex  ml-4 ">
                <HomeProducts
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
