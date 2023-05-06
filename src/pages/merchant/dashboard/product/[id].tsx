import StoreLayout from '@/layouts/StoreLayout'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useGetOneMerchantProductQuery } from '@/redux/services/merchant'
import { wrapper } from '@/redux/store'
import MerchantProductDetails from '@/sections/MerchatProductDetials'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const MerchantProduct = () => {
  const router = useRouter()

  const { data, isLoading } = useGetOneMerchantProductQuery(
    router.query.id as string
  )
  return (
    <div>
      {data ? (
        <MerchantProductDetails
          id={data.id}
          published={data.published as number}
          isOwner
          name={data.name}
          price={data.price}
          rating={0}
          reviews="0"
          img={
            data.images && data.images[0]
              ? data.images[0].url
              : 'assets/paint.png'
          }
          description={data.description}
        />
      ) : (
        isLoading && <div>Loading....</div>
      )}
    </div>
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
