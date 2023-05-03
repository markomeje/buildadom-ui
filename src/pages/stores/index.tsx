import MainLayout from '@/layouts/MainLAyout'
import StorePageBody from '@/sections/StorePageBody'
import StorePageHeader from '@/sections/StorePageHeader'

import React, { ReactElement } from 'react'

const Stores = () => {
  return (
    <div className="flex flex-col">
      <StorePageHeader />
      <StorePageBody />
    </div>
  )
}

export default Stores

Stores.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
