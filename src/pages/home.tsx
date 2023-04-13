import MainLayout from '@/layouts/MainLAyout'
import HomeBanner from '@/sections/HomeBanner'
import HomeProducts from '@/sections/HomeProducts'
import React, { ReactElement } from 'react'

const Home = () => {
  return (
    <div className="wrapper">
      <HomeBanner />
      <HomeProducts />
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
