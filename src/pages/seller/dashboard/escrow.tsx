import StoreLayout from '@/layout/seller/Store'
import React, { ReactElement } from 'react'

const Escrow = () => {
  return <div>Escrow</div>
}

export default Escrow

Escrow.getLayout = function getLayout(page: ReactElement) {
  return <StoreLayout>{page}</StoreLayout>
}
