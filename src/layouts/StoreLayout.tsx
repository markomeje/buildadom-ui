import { IReact } from '@/interface/general.interface'
import React from 'react'
import Footer from './Footer'
import MerchantNav from './MerchantNav'

const StoreLayout = ({ children }: IReact) => {
  return (
    <div className="w-full">
      <MerchantNav />
      {children}
      <Footer />
    </div>
  )
}

export default StoreLayout
