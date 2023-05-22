import AboutStoreHeader from '@/components/StoreHeader'
import StoreHandler from '@/layouts/StoreHandler'
import StoreLayout from '@/layouts/StoreLayout'
import AccountSetupModal from '@/sections/AccountSetup'
import { setUser } from '@/redux/reducer/tokenReducer'
import { wrapper } from '@/redux/store'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { useGetAccountInfoQuery } from '@/redux/services/account.service'
import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'

const Details = ({ title, content }: { title: string; content: string }) => (
  <div className="mb-4">
    <h2 className="font-semibold font-poppins text-[17px]">{title}</h2>
    <span className="font-[500] font-poppins text-gray-500 text-[15px]">
      {content}
    </span>
  </div>
)

const AccountSetup = () => {
  const { data, isLoading } = useGetAccountInfoQuery()
  const handleEdit = () => {
    setEdit(!edit)
  }
  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    if (data === null) {
      setEdit(true)
    }
  }, [data])

  return (
    <>
      <AboutStoreHeader />
      <StoreHandler>
        <div className="w-full mt-10 lg:mt-0 mb-4">
          {edit ? (
            <div className="flex w-full border-b border-[#CCCCCC]">
              {data === null ? (
                <h1 className="leading-[36px] capitalize text-[21px]  font-poppins font-semibold pb-3">
                  Add Account Details
                </h1>
              ) : (
                <>
                  <i
                    className="ri-arrow-left-line mr-3 cursor-pointer font-300 text-[22px]"
                    onClick={handleEdit}
                  ></i>
                  <h1 className="leading-[36px] capitalize text-[21px]  font-poppins font-semibold pb-3">
                    Edit Account Information
                  </h1>
                </>
              )}
            </div>
          ) : (
            <h1 className="leading-[36px] capitalize text-[21px]  font-poppins font-semibold pb-3 w-full border-b border-[#CCCCCC]">
              Account Information
              <i
                className="ri-edit-2-line ml-4 cursor-pointer font-300 text-[22px]"
                onClick={handleEdit}
              ></i>
            </h1>
          )}
          <>
            {isLoading ? (
              <ListSkeleton />
            ) : edit && !isLoading ? (
              <AccountSetupModal edit={handleEdit} />
            ) : (
              <div className="flex mt-5 flex-col">
                <Details
                  title="Account Name"
                  content={data && data.account_name}
                />
                <Details
                  title="Account Number"
                  content={data && data.account_number}
                />
                <Details title="Bank Name" content={data && data.bank} />
              </div>
            )}
          </>
        </div>
      </StoreHandler>
    </>
  )
}

export default AccountSetup

AccountSetup.getLayout = function getLayout(page: ReactElement) {
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
