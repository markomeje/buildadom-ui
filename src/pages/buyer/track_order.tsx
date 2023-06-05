import Tracking from '@/components/Tracking'
import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement } from 'react'
import OrderSummary from '../OrderSummary'

const TrackOrder = () => {
  return (
    <div className="wrapper">
      <h1 className="py-12 w-full  font-semibold text-[32px] leading-[40px]">
        Order Tracking
      </h1>
      <div className="flex w-full  mb-6">
        <Tracking />
        <OrderSummary />
      </div>
    </div>
  )
}

export default TrackOrder

TrackOrder.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
