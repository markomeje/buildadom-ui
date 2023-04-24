import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import { useAllProductsQuery } from '@/redux/services/general.service'
import HomeProducts from '@/sections/HomeProducts'
import React, { ReactElement } from 'react'

const Explore = () => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <ProductLayout>
      <HomeProducts isLoading={isLoading} data={data} />
    </ProductLayout>
  )
}

export default Explore

Explore.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
