import AboutStoreHeader from '@/components/StoreHeader'
import { IProduct } from '@/interface/general.interface'
import StoreHandler from '@/layouts/StoreHandler'
import StoreLayout from '@/layouts/StoreLayout'
import { setAddedStepper } from '@/redux/reducer/countryReducer'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useGetOneMerchantProductQuery } from '@/redux/services/merchant'
import { useTypedDispatch, wrapper } from '@/redux/store'
import MerchantProductDetails from '@/sections/MerchatProductDetials'
import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'
import { locateImg } from '@/util/locateImg'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'

const MerchantProduct = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const { data, isLoading, isSuccess, isError } = useGetOneMerchantProductQuery(
    router.query.id as string
  )
  useEffect(() => {
    const callDispatch = () => {
      dispatch(setAddedStepper(data as IProduct))
    }
    if (data) {
      callDispatch()
    }
  }, [data, dispatch])
  return (
    <>
      <AboutStoreHeader />
      <StoreHandler>
        <div>
          {isSuccess ? (
            <MerchantProductDetails
              id={data.id}
              isError={isError}
              published={data.published as number}
              isOwner
              name={data.name}
              price={`${data.currency && data.currency.symbol} ${data.price}`}
              rating={0}
              reviews="0"
              img={locateImg(data.images, 'main') || '/assets/placeholder.jpg'}
              description={data.description}
            />
          ) : (
            isLoading && <ListSkeleton />
          )}
        </div>
      </StoreHandler>
    </>
  )
}

export default MerchantProduct
MerchantProduct.getLayout = function getLayout(page: ReactElement) {
  return <StoreLayout>{page}</StoreLayout>
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if (token) {
      store.dispatch(setUser(JSON.parse(token as string)))
    }
    if (!token) {
      return {
        redirect: {
          destination: '/merchant/login',
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  })
