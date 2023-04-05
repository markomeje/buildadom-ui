/* eslint-disable @next/next/no-img-element */
import EmptyState from '@/components/shared/EmptyState'
import { useAppSelector } from '@/hooks/useReducer'
import StoreLayout from '@/layout/seller/Store'
import ModalWraper from '@/modals'
import AddProductModal from '@/modals/AddProductModal'
import React, { ReactElement } from 'react'
import { products } from '@/utils/products'
import ProductCategory from '@/components/sections/dasboard/ProductCategory'
const MyStore = () => {
  const { specificModal, modalType } = useAppSelector((state) => state.modal)
  return (
    <>
      {specificModal && modalType === 'product' && (
        <ModalWraper>
          <AddProductModal />
        </ModalWraper>
      )}
      {products.length < 0 ? (
        <>
          <ProductCategory header={'Pipes'} products={products} />
          <ProductCategory header={'Paint'} products={products} />
        </>
      ) : (
        <EmptyState />
      )}
    </>
  )
}

export default MyStore

MyStore.getLayout = function getLayout(page: ReactElement) {
  return <StoreLayout>{page}</StoreLayout>
}
