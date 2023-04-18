/* eslint-disable @next/next/no-img-element */
import StoreLayout from '@/layouts/StoreLayout'
import ModalWraper from '@/modals'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import React, { ReactElement } from 'react'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { setUser } from '@/redux/reducer/tokenReducer'
import ProductCategory from '@/components/ProductCategory'
import EmptyState from '@/components/EmptyState'
import UseStepper from '@/hooks/useStepper'
import { AddProduct } from '@/lib/stepper'
import { useGetMerchatProductsQuery } from '@/redux/services/store.slice'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { specificModal } from '@/redux/reducer/modalReducer'
import Loader from '@/ui/general/Loader'
const MyStore = () => {
  const dispatch = useTypedDispatch()
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const { step } = useTypedSelector((state) => state.stepper)
  const { data, isLoading } = useGetMerchatProductsQuery()
  console.log(data, 'data')
  const handleClick = () => {
    dispatch(specificModal('product'))
    dispatch(setStepper(1))
  }
  return (
    <>
      {modal && modalType === 'product' && (
        <ModalWraper>
          <UseStepper step={step} stepObject={AddProduct} />
        </ModalWraper>
      )}
      {!isLoading && data.data.length > 0 ? (
        <>
          <div className="w-full flex items-end  justify-end">
            <button
              className="w-[30px] lg:w-[35px] h-[30px] lg:h-[35px] mr-6 lg:mr-0  rounded-[40px] cursor-pointer p-3 flex items-center justify-center bg-bd-blue"
              onClick={handleClick}
            >
              <i className="ri-add-line text-white font-semibold text-[14px] lg:text-[20px]"></i>
            </button>
          </div>
          <ProductCategory header={'Pipes'} products={data.data} />
          <ProductCategory header={'Paint'} products={data.data} />
        </>
      ) : isLoading ? (
        <Loader />
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
    if (!token) {
      return {
        redirect: {
          destination: '/merchant/login',
          permanent: false,
        },
      }
    }
    if (token) {
      store.dispatch(setUser(JSON.parse(token as string)))
    }
    return {
      props: {},
    }
  })
