import MainLayout from '@/layouts/MainLAyout'
import HomeBanner from '@/sections/HomeBanner'
import HomeProducts from '@/sections/HomeProducts'
import React, { ReactElement, useEffect } from 'react'
import { useTypedDispatch } from '@/redux/store'
import { setDisplayType } from '@/redux/reducer/modalReducer'
import Banner from '@/components/Banner'
import Link from 'next/link'
import StoreCollections from '@/sections/StoreCollections'
import Subscriptions from '@/sections/Subscriptions'
import { useAllProductsQuery } from '@/redux/services/general.service'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'

const Home = () => {
  const { data, isLoading, isSuccess } = useAllProductsQuery()

  const dispatch = useTypedDispatch()
  useEffect(() => {
    dispatch(setDisplayType('grid'))
  }, [dispatch])
  return (
    <div className="lg:wrapper">
      <HomeBanner />
      <div className="flex flex-col  px-6 lg:px-0 items-start py-8">
        <div className="flex items-center w-full justify-between">
          <h2 className="text-[22px] leading-[33px]   font-poppins font-semibold">
            New Products
          </h2>
          <Link
            href={'/explore'}
            className="text-[13px] underline leading-[14px] font-poppins"
          >
            see all products
          </Link>
        </div>
        <div className="ml-5 w-full mt-4">
          {isLoading && (
            <ProductSkeleton amount={5} className="lg:grid-cols-5" />
          )}{' '}
          {isSuccess && <HomeProducts data={data} />}
        </div>
        <Banner />
        <StoreCollections />
        <Subscriptions />
      </div>
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
