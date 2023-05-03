/* eslint-disable @next/next/no-img-element */
import { specificModal } from '@/redux/reducer/modalReducer'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import React from 'react'

const EmptyState = ({
  showButton = true,
  message,
}: {
  showButton?: boolean
  message: string
}) => {
  const dispatch = useTypedDispatch()
  const handleClick = () => {
    dispatch(specificModal('product'))
    dispatch(setStepper(1))
  }
  return (
    <div className="flex items-center flex-col justify-center w-full h-full">
      <img src="/assets/box.png" alt="Empoy state" />
      <span className="w-[410px] text-[#667085] font-poppins pb-2 -mt-4 leading-[30px] text-center text-[20px] font-[500]">
        {message}
      </span>
      {showButton && (
        <Button
          onClick={handleClick}
          title="Add new product"
          classNames=" my-4 w-[210px] height-[50px] py-4  rounded-[50px]"
        />
      )}
    </div>
  )
}

export default EmptyState
