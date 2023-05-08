import AboutStoreHeader from '@/components/StoreHeader'
import StoreHandler from '@/layouts/StoreHandler'
import StoreLayout from '@/layouts/StoreLayout'
import { setUser } from '@/redux/reducer/tokenReducer'
import { wrapper } from '@/redux/store'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

const Escrow = () => {
  return (
    <>
      <AboutStoreHeader />
      <StoreHandler>
        <div>Escrow</div>
      </StoreHandler>
    </>
  )
}

export default Escrow

Escrow.getLayout = function getLayout(page: ReactElement) {
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
    }
    return {
      props: {},
    }
  })
