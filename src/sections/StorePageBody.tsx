/* eslint-disable @typescript-eslint/no-explicit-any */
import StoreModel from '@/components/StoreModel'
import { IStore } from '@/interface/store.interface'
import { useAllStoresQuery } from '@/redux/services/general.service'
import { locateImg } from '@/util/locateImg'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const StorePageBody = () => {
  const { data: stores, isLoading } = useAllStoresQuery(12)

  return (
    <div className="lg:py-12 py-2 wrapper">
      {isLoading ? (
        <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
          <div className="flex gap-x-4">
            <Skeleton width={300} height={300} />
            <Skeleton width={300} height={300} />
            <Skeleton width={300} height={300} />
            <Skeleton width={300} height={300} />
          </div>
        </SkeletonTheme>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 px-3 lg:px-0 lg:gap-6">
          {stores &&
            stores.map((store: IStore) => {
              return (
                <StoreModel
                  key={store.id}
                  id={store.id}
                  name={store.name}
                  content={store.description && store.description.slice(0, 100)}
                  img={
                    locateImg(store.images && store.images, 'logo') as string
                  }
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

export default StorePageBody
