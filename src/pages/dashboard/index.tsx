/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapper } from '@/redux/store'
import React, { ReactElement } from 'react'
import {getCookie} from 'cookies-next'
import { GetServerSideProps } from 'next'
import { setUser } from '@/redux/reducer/tokenReducer'
import Dashboard from '@/layouts/Dashboard'
import CreateHeader from '@/components/CreateHeader'
import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
// import { validationApi } from '@/redux/services/validation.service'
import { useGetValidationDetailsQuery } from '@/redux/services/validation.service'
import CreateStore from '@/sections/CreateStore'

const MerchantDashboard = () => {
  const { data } = useGetValidationDetailsQuery()
  console.log(data)

  return (
    <div className="wrapper">
    <CreateHeader>
      <div className="flex flex-col">
        <h1 className="font-semibold font-poppins text-[32px] mb-2 leading-[48px]">
          Create Store
        </h1>
        <span className="max-w-[384px] text-bd-black text-[15px] font-poppins  leading-[24px]">
          Kindly provide all informations below for us to help you create your
          unique store
        </span>
      </div>
      <DisplayState data={data} />
    </CreateHeader>
    <CreateStore />
  </div>
  )
}

export default MerchantDashboard
MerchantDashboard.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>
} 

const DisplayState = ({ data }: { data: any }) => {
  const router = useRouter()
  if (data == null) {
    return (
      <Button
        onClick={() =>
          router.push({
            pathname: '/dashboard/verifyId',
            query: { stepper: 1 },
          })
        }
        classNames="w-[250px] py-4 px-4 border-gray-300 rounded-[50px] hover:border-bd-blue"
        type="outlined"
        title="Start ID Validation Now"
      />
    )
  } else if (data !== null && data.image === null) {
    return (
      <Button
        classNames="w-[250px] py-4 px-4 border-gray-300 rounded-[50px] hover:border-bd-blue"
        onClick={() =>
          router.push({
            pathname: '/dashboard/verifyId',
            query: { stepper: 2 },
          })
        }
        type="outlined"
        title="Upload Verification ID"
      />
    )
  } else if (data !== null && data.verified === 0) {
    return (
      <Button
        type="outlined"
        title="Wait For Admin ID Verification "
        classNames="py-4 px-6 border-gray-300 rounded-[50px] hover:border-bd-blue"
      />
    )
  } else {
    return null
  }
}

export const getServerSideProps:GetServerSideProps =  wrapper.getServerSideProps((store) =>async ({req,res}) =>{
  const token = getCookie('user', {req,res});
  store.dispatch(setUser(JSON.parse(token as string)));
  return {
    props: {}
  }
})