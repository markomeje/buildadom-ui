import AboutStoreHeader from '@/components/sections/dasboard/AboutStoreHeader'
import StoreHandler from '@/components/sections/dasboard/StoreHandler'
import { IReact } from '@/interface/dashboard'
import React from 'react'
import DashboardNav from './DahbardNav'
import Footer from './Footer'

const StoreLayout = ({ children }: IReact) => {
  return (
    <div className="w-full">
      <DashboardNav />
      <AboutStoreHeader />
      <StoreHandler>{children}</StoreHandler>
      <Footer />
    </div>
  )
}

export default StoreLayout
