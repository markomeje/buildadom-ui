import MainLayout from '@/layouts/MainLAyout'
import { DropSearch } from '@/layouts/ProdutLayout'
import { useAllProductsQuery } from '@/redux/services/general.service'
import HomeProducts from '@/sections/HomeProducts'
import ProductHeader from '@/sections/ProductHeader'
import React, { ReactElement } from 'react'

const StoreProducts = () => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <div>
      <ProductHeader />
      <div className="my-8 wrapper">
        <div className="flex w-full justify-end mb-8 items-end">
          <DropSearch header="Sort By:" text="All" />
        </div>
        <HomeProducts isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}

export default StoreProducts

StoreProducts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
