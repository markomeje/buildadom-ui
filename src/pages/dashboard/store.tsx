/* eslint-disable @next/next/no-img-element */
import StoreLayout from '@/layouts/StoreLayout'
import ModalWraper from '@/modals'
import { useTypedSelector, wrapper } from '@/redux/store'
import React, { ReactElement } from 'react'
import { getCookie } from 'cookies-next'
import AddProductModal from '@/modals/AddProductWrapper'
import { products } from '@/util/products'
import { GetServerSideProps } from 'next'
import { setUser } from '@/redux/reducer/tokenReducer'
import ProductCategory from '@/components/ProductCategory'
import EmptyState from '@/components/EmptyState'
const MyStore = () => {
  const { specificModal, modalType } = useTypedSelector((state) => state.modal)
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    if(token) {
    store.dispatch(setUser(JSON.parse(token as string)))
    }
    return {
      props: {},
    }
  })
