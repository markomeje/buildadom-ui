import BuyerSidebar from '@/components/BuyerSidebar'
import StoreModel from '@/components/StoreModel'
import { IStore } from '@/interface/store.interface'
import MainLayout from '@/layouts/MainLAyout'
import { useAllStoresQuery } from '@/redux/services/general.service'
import { locateImg } from '@/util/locateImg'
import React, { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Favourites = () => {
  const { data: stores, isLoading } = useAllStoresQuery(5)

  return (
    <BuyerSidebar header="Favourite Stores">
      <div className="flex flex-col w-full">
        <h1 className="font-poppins text-[18px] leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Shop from favourites
        </h1>
        <div className="py-12">
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
            <div className="flex flex-wrap gap-6">
              {stores &&
                stores.map((store: IStore) => {
                  return (
                    <StoreModel
                      key={store.id}
                      id={store.id}
                      name={store.name}
                      content={
                        store.description && store.description.slice(0, 100)
                      }
                      img={
                        locateImg(
                          store.images && store.images,
                          'logo'
                        ) as string
                      }
                    />
                  )
                })}
            </div>
          )}
        </div>
      </div>
    </BuyerSidebar>
  )
}

export default Favourites

Favourites.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
