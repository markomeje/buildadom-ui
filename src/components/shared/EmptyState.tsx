/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from '@/hooks/useReducer'
import { specificModal } from '@/redux/reducers/modal_reducer'
import React from 'react'
import Button from './Button'

const EmptyState = () => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(specificModal('product'))
  }
  return (
    <div className="flex items-center flex-col justify-center w-full h-full">
      <img src="/assets/box.png" alt="Empoy state" />
      <span className="w-[410px] text-[#667085] font-poppins pb-2 leading-[30px] text-center text-[20px] font-[500]">
        You have no product on your store at this time
      </span>
      <Button
        onClick={handleClick}
        title="Add new product"
        classNames=" my-4 w-[210px] height-[50px] py-4  rounded-[50px]"
      />
    </div>
  )
}

export default EmptyState
