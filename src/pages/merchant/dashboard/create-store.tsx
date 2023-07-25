/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapper } from '@/redux/store'
import React, { ReactElement } from 'react'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { setUser } from '@/redux/reducer/tokenReducer'
import Dashboard from '@/layouts/Dashboard'
import CreateHeader from '@/components/CreateHeader'
import CreateStore from '@/sections/CreateStore'

const MerchantDashboard = () => {
  return (
    <div className="px-4 lg:px-0 lg:wrapper">
      <CreateHeader>
        <div className="flex flex-col">
          <h1 className="font-semibold font-poppins text-[28px] lg:text-[32px] mb-2 leading-[48px]">
            Create Store
          </h1>
          <span className="max-w-[384px] text-bd-black text-[15px] font-poppins  leading-[24px]">
            Kindly provide all informations below for us to help you create your
            unique store
          </span>
        </div>
        {/* <DisplayState data={data} loading={isLoading} /> */}
      </CreateHeader>
      <CreateStore />
    </div>
  )
}

export default MerchantDashboard
MerchantDashboard.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>
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
