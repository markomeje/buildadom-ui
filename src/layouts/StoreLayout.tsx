import AboutStoreHeader from '@/components/StoreHeader'
import { IReact } from '@/interface/general.interface'
import React from 'react'
import DashboardNav from './DashboardNav'
import Footer from './Footer'
import StoreHandler from './StoreHandler'

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
