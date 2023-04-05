/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateHeader from '@/components/sections/dasboard/createHeader'
import CreateStore from '@/components/sections/dasboard/forms/CreateStore'
import Button from '@/components/shared/Button'
// import { useAppDispatch } from '@/hooks/useReducer'
// import StoreStepper from '@/components/steppers/Store.stepper'
import Dashboard from '@/layout/seller/Dashboard'
import { useGetValidationDetailsQuery } from '@/redux/reducers/mechant_validation_reducer'
// import { setStepper } from '@/redux/reducers/step_reducer'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Create_store = () => {
  const { data } = useGetValidationDetailsQuery()

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

export default Create_store

Create_store.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>
}

const DisplayState = ({ data }: { data: any }) => {
  const router = useRouter()
  if (data == null) {
    return (
      <Button
        onClick={() =>
          router.push({
            pathname: '/seller/dashboard/verify-id',
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
            pathname: '/seller/dashboard/verify-id',
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
