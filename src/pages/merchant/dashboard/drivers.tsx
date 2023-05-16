/* eslint-disable @next/next/no-img-element */
import AboutStoreHeader from '@/components/StoreHeader'
import StoreHandler from '@/layouts/StoreHandler'
import StoreLayout from '@/layouts/StoreLayout'
import ModalWraper from '@/modals'
import AddDriverModal from '@/modals/AddDriver'
import { specificModal } from '@/redux/reducer/modalReducer'
import { setUser } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch, useTypedSelector, wrapper } from '@/redux/store'
import Button from '@/ui/button/Button'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

const EmptyState = () => {
  const dispatch = useTypedDispatch()
  const showDriverModal = () => {
    dispatch(specificModal('driver_modal'))
  }
  return (
    <div className="flex flex-col items-center h-[400px] justify-center">
      <img
        src="/assets/Driver.svg"
        alt="driver"
        className="w-[110px] h-[110px] rouneded-[110px]"
      />
      <span className="w-[308px] text-center py-4 text-[20px] leading-[30px] text-[#667085] font-semibold font-poppins">
        You have not registered driver at this time.
      </span>

      <Button
        title="Add Driver"
        classNames="w-[178px] h-[50px] rounded-[50px]"
        onClick={showDriverModal}
      />
    </div>
  )
}

const Drivers = () => {
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  return (
    <>
      {modal && modalType === 'driver_modal' && (
        <ModalWraper>
          <AddDriverModal />
        </ModalWraper>
      )}
      <AboutStoreHeader />
      <StoreHandler>
        <div className="flex-col">
          <h1 className="leading-[36px] capitalize text-[24px]  font-poppins font-semibold pb-3 w-full border-b border-[#CCCCCC]">
            Dispatch Drivers
          </h1>
          <EmptyState />
        </div>
      </StoreHandler>
    </>
  )
}

export default Drivers

Drivers.getLayout = function getLayout(page: ReactElement) {
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
