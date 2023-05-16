import { useGetValidationDetailsQuery } from '@/redux/services/validation.service'
import Button from '@/ui/button/Button'
import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'
import { useRouter } from 'next/router'
import React from 'react'

const AdminVerification = () => {
  const { data, isLoading } = useGetValidationDetailsQuery()
  console.log(data, 'datat')
  const router = useRouter()
  const isVerified = data && data.verified === 1
  const redirect = () => {
    router.push('/merchant/dashboard/create-store')
  }
  return (
    <>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <div className="flex flex-col h-[250px] items-center justify-center">
          <div className="w-[90px] h-[90px] border border-gray-200 rounded-[80px]  flex items-center justify-center bg-white">
            <i
              className={`${
                isVerified
                  ? 'ri-check-line text-green-500'
                  : 'ri-close-line text-yellow-500 '
              } text-[45px] font-semibold `}
            ></i>
          </div>
          <span className="font-poppins pt-3  mt-3 text-[18px] text-gray-600">
            {isVerified
              ? 'You are verified successfully by admin'
              : 'You are yet to be verified by admin'}
          </span>
          {isVerified && (
            <Button
              onClick={redirect}
              title="Create a store"
              classNames="mb-3 mt-6 py-4 w-[40%] border border-bd-blue rounded-[10px] mx-auto"
              type="outlined"
            />
          )}
        </div>
      )}
    </>
  )
}

export default AdminVerification
