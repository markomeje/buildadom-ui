/* eslint-disable @next/next/no-img-element */
import { closeModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import React from 'react'

const ConfirmOrder = () => {
  const dispatch = useTypedDispatch()
  const closeProductModal = () => {
    dispatch(closeModal())
  }
  return (
    <div className="flex relative flex-col p-8">
      <h1 className="font-poppins text-[24px] text-center  leading-[36px] font-semibold pb-2">
        Thanks for your purchase
      </h1>
      <i
        className="text-[16px] absolute top-4 right-4 w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
        onClick={closeProductModal}
      ></i>
      <p className="text-center pt-4 w-[380px] mx-auto font-poppins text-[#333333] text-[14px] leading-[21px]">
        Please kindly leave a review on the service and product purchased.
      </p>
      <div className="flex w-[80%] mx-auto py-4 my-3 justify-between items-center">
        <img className="cursor-pointer" src="/assets/star.png" alt="star" />
        <img className="cursor-pointer" src="/assets/star.png" alt="star" />
        <img className="cursor-pointer" src="/assets/star.png" alt="star" />
        <img className="cursor-pointer" src="/assets/star.png" alt="star" />
        <img className="cursor-pointer" src="/assets/star.png" alt="star" />
      </div>
      <textarea
        className="h-[100px] mt-4 focus:outline-none w-[85%] mx-auto border border-[#333333] rounded-[8px] px-4 py-4  italic"
        placeholder="leave a comment"
      />
      <Button
        title="Submit"
        classNames="py-[10px] px-[54px] mt-5 w-[65%] mx-auto rounded-[52px] hover:font-semibold"
      />
    </div>
  )
}

export default ConfirmOrder
