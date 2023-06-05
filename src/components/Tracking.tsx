import ModalWraper from '@/modals'
import ConfirmOrder from '@/modals/ConfirmOrder'
import { specificModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import React from 'react'

const Tracking = () => {
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const dispatch = useTypedDispatch()
  const confirmOrder = () => {
    dispatch(specificModal('track_order'))
  }
  return (
    <>
      {modal && modalType === 'track_order' && (
        <ModalWraper>
          <ConfirmOrder />
        </ModalWraper>
      )}
      <div className="w-full flex flex-col basis-[65%] mr-10">
        <div>
          <h1 className="font-poppins text-[17px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
            Your order is on the way
          </h1>
        </div>
        <div className="mt-8">
          <h1 className="font-poppins text-[17px]  leading-[36px] mb-6 font-semibold pb-2 border-b border-[#CCCCCC]">
            Confirm Order Recieved?
          </h1>
          <span className="font-poppins  text-[14px] leading-[21px]">
            Please confirm you have recieved your order to complete the purchase
            process
          </span>
          <Button
            onClick={confirmOrder}
            title="Confirm"
            classNames="py-[10px] px-[54px] mt-5 w-[210px] rounded-[52px] hover:font-semibold"
          />
        </div>
      </div>
    </>
  )
}

export default Tracking
