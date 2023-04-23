import MainLayout from '@/layouts/MainLAyout'
import HomeBanner from '@/sections/HomeBanner'
import HomeProducts from '@/sections/HomeProducts'
import { useAllProductsQuery } from '@/redux/services/general.service'

import React, { ReactElement, useEffect } from 'react'
import { useTypedDispatch } from '@/redux/store'
import { setDisplayType } from '@/redux/reducer/modalReducer'

const Home = () => {
  const { data, isLoading } = useAllProductsQuery()
  const dispatch = useTypedDispatch()
  useEffect(() => {
    dispatch(setDisplayType('grid'))
  }, [dispatch])
  return (
    <div className="wrapper">
      <HomeBanner />
      <div className="flex flex-col  px-6 lg:px-0 items-start py-8">
        <h2 className="text-[22px] leading-[33px] mb-6 font-poppins font-semibold">
          New Products
        </h2>
        <HomeProducts isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
