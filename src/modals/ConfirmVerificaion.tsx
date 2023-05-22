import { incrementStepper } from '@/redux/reducer/stepperReducer'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import React from 'react'

const ConfirmVerificaion = () => {
  const dispatch = useTypedDispatch()
  const nextAction = () => {
    dispatch(incrementStepper())
  }
  return (
    <div className="flex flex-col w-full h-full items-center p-[30px] justify-center">
      <h2 className=" text-[20px] font-semibold font-poppins leading-[40px] text-center ">
        Phone Verification Successful 🎉
      </h2>
      <span className="font-poppins text-[15px] text-center max-w-[380px] mt-2 text-[#333333] leading-[20px]">
        Your phone number has been verified click next for email verification
      </span>
      <Button
        onClick={nextAction}
        title="Next"
        classNames="h-[40px] text-[15px] w-[150px] mt-5 py-2 flex items-center justify-center rounded-[20px]"
      />
    </div>
  )
}

export default ConfirmVerificaion
