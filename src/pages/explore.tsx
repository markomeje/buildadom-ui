/* eslint-disable react-hooks/rules-of-hooks */
import EmptyState from '@/components/EmptyState'
import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import {
  useAllProductsQuery,
  useGetQueryByCategoryQuery,
} from '@/redux/services/general.service'
import { useTypedSelector } from '@/redux/store'
import HomeProducts from '@/sections/HomeProducts'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React, { ReactElement } from 'react'

const Explore = () => {
  let loading, info, success
  const { categoryId } = useTypedSelector((state) => state.dashboard)
  if (!categoryId) {
    const res = useAllProductsQuery()
    loading = res.isLoading
    info = res.data
    success = res.isSuccess
  } else {
    const res = useGetQueryByCategoryQuery(categoryId)
    loading = res.isLoading
    info = res.data
    success = res.isSuccess
  }
  return (
    <ProductLayout>
      {loading ? (
        <ProductSkeleton amount={5} className="lg:grid-cols-5" />
      ) : success ? (
        <HomeProducts data={info} />
      ) : (
        <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
      )}
    </ProductLayout>
  )
}

export default Explore

Explore.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
