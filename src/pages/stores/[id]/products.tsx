import EmptyState from '@/components/EmptyState'
import MainLayout from '@/layouts/MainLAyout'
import { DropSearch } from '@/layouts/ProdutLayout'
import { useAllProductsQuery } from '@/redux/services/general.service'
import HomeProducts from '@/sections/HomeProducts'
import ProductHeader from '@/sections/ProductHeader'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React, { ReactElement } from 'react'

const StoreProducts = () => {
  const { data, isLoading, isSuccess } = useAllProductsQuery()

  return (
    <div>
      <ProductHeader />
      <div className="my-8 wrapper">
        <div className="flex w-full justify-end mb-8 items-end">
          <DropSearch header="Sort By:" text="All" />
        </div>
        {isLoading ? (
          <ProductSkeleton amount={5} className="lg:grid-cols-5" />
        ) : isSuccess ? (
          <HomeProducts data={data} />
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
