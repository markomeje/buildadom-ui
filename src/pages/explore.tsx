/* eslint-disable react-hooks/rules-of-hooks */
import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import {
  useAllProductsQuery,
  useGetQueryByCategoryQuery,
} from '@/redux/services/general.service'
import { useTypedSelector } from '@/redux/store'
import HomeProducts from '@/sections/HomeProducts'
import React, { ReactElement } from 'react'

const Explore = () => {
  let loading, info
  const { categoryId } = useTypedSelector((state) => state.dashboard)
  if (!categoryId) {
    const res = useAllProductsQuery()
    loading = res.isLoading
    info = res.data
  } else {
    const res = useGetQueryByCategoryQuery(categoryId)
    loading = res.isLoading
    info = res.data
  }
  return (
    <ProductLayout>
      <HomeProducts isLoading={loading} data={info} />
    </ProductLayout>
  )
}

export default Explore

Explore.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
