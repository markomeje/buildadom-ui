/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import StoreLayout from '@/layouts/StoreLayout'
import axios from 'axios'
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
import { useGetMerchatProductsQuery } from '@/redux/services/merchant'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { specificModal } from '@/redux/reducer/modalReducer'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import { locateMerchantProducts } from '@/util/locateImg'
import AboutStoreHeader from '@/components/StoreHeader'
import StoreHandler from '@/layouts/StoreHandler'

const MyStore = () => {
  const dispatch = useTypedDispatch()
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const { step } = useTypedSelector((state) => state.stepper)

  const { data, isLoading, isSuccess } = useGetMerchatProductsQuery()
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
      <AboutStoreHeader />
      <StoreHandler>
        {!isLoading &&
        // !loading &&
        isSuccess &&
        locateMerchantProducts(data).length > 0 ? (
          <>
            <div className="w-full flex items-end  justify-end">
              <button
                className="w-[30px] lg:w-[35px] h-[30px] lg:h-[35px] mr-6 lg:mr-0  rounded-[40px] cursor-pointer p-3 flex items-center justify-center bg-bd-blue"
                onClick={handleClick}
              >
                <i className="ri-add-line text-white font-semibold text-[14px] lg:text-[20px]"></i>
              </button>
            </div>
            <div className="lg:h-[800px] w-full  lg:overflow-y-scroll">
              {locateMerchantProducts(data).map((product: any, index: any) => (
                <ProductCategory
                  key={index}
                  header={product}
                  products={data[product]}
                />
              ))}
            </div>
          </>
        ) : isLoading ? (
          <ProductSkeleton amount={10} className="lg:grid-cols-4 my-5" />
        ) : (
          <EmptyState message="You have no product on your store at this time" />
        )}
      </StoreHandler>
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
      const parsedData = JSON.parse(token as string)
      store.dispatch(setUser(parsedData))
      const {
        data: { details },
      } = await axios.get(
        'https://dev.buildadom.net/api/v1/marchant/identification/details',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${parsedData.token}`,
          },
        }
      )
      if (details.verified !== 1) {
        return {
          redirect: {
            permanent: false,
            destination: '/merchant/dashboard/verifyId',
          },
        }
      } else if (details.verified === 1) {
        const { data } = await axios.get(
          'https://dev.buildadom.net/api/v1/marchant/store',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${parsedData.token}`,
            },
          }
        )
        console.log(data, 'datatum')
      }
    }
    return {
      props: {},
    }
  })
