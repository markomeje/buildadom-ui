import MainLayout from '@/layouts/MainLAyout'
import HomeBanner from '@/sections/HomeBanner'
import HomeProducts from '@/sections/HomeProducts'
import { useAllProductsQuery } from '@/redux/services/general.service'

import React, { ReactElement, useEffect } from 'react'
import { useTypedDispatch } from '@/redux/store'
import { setDisplayType } from '@/redux/reducer/modalReducer'
import Banner from '@/components/Banner'
import Link from 'next/link'
import { stores } from '@/sections/StorePageBody'
import StoreCollections from '@/sections/StoreCollections'
import Subscriptions from '@/sections/Subscriptions'

const Home = () => {
  const { data, isLoading } = useAllProductsQuery()
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
            href={'/stores'}
            className="text-[13px] underline leading-[14px] font-poppins"
          >
            see all products
          </Link>
        </div>
        <div className="ml-5 mt-4">
          <HomeProducts isLoading={isLoading} data={data && data.slice(0, 5)} />
        </div>
        <Banner />
        {stores &&
          stores.slice(0, 4).map((store, index) => {
            return (
              <StoreCollections key={index} name={store.name} img={store.img} />
            )
          })}
        <Subscriptions />
      </div>
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
