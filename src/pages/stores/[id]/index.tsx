import EmptyState from '@/components/EmptyState'
import MainLayout from '@/layouts/MainLAyout'
import { DropSearch } from '@/layouts/ProdutLayout'
import { useGetStoreDetailsQuery } from '@/redux/services/general.service'
import HomeProducts from '@/sections/HomeProducts'
import ProductHeader from '@/sections/ProductHeader'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import StoreInfoSkeleton from '@/ui/skeletonLoader/StoreInfoSkeleton'
import { locateImg } from '@/util/locateImg'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const StoreProducts = () => {
  const router = useRouter()
  const { data, isLoading, isSuccess } = useGetStoreDetailsQuery(
    parseInt(router.query.id as string)
  )
  return (
    <div>
      {isLoading ? (
        <StoreInfoSkeleton />
      ) : isSuccess ? (
        <ProductHeader
          name={data.name}
          address={data.address}
          city={data.city}
          description={data.description}
          cover_img={locateImg(data.images, 'cover') as string}
          logo_img={locateImg(data.images, 'logo') as string}
        />
      ) : (
        <EmptyState showButton={false} message="No Store Detail" />
      )}

      <div className="lg:my-8 wrapper">
        <div className="flex w-full justify-end mb-8 items-end">
          <DropSearch header="Sort By:" text="All" />
        </div>
        {isLoading ? (
          <ProductSkeleton amount={5} className="lg:grid-cols-5" />
        ) : isSuccess ? (
          <HomeProducts data={data.products} />
        ) : (
          <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
        )}
      </div>
    </div>
  )
}

export default StoreProducts

StoreProducts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
