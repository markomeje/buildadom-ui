import Button from '@/components/shared/Button'
import React, { useState } from 'react'

const EmailVerificationModal = () => {
  const [type, setType] = useState<string>('email')
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setType('number')
  }
  return (
    <div className="flex flex-col w-full h-full items-center p-[30px] justify-center">
      <h2 className=" text-[24px] font-semibold font-poppins leading-[40px] text-center ">
        Enter your security code
      </h2>
      <span className="font-poppins text-[15px] text-center max-w-[380px] mt-2 text-[#333333] leading-[20px]">
        Please kindly enter the OTP code we sent to <br />
        <span className="font-bold">
          {type === 'email' ? 'example......@gmail.com' : '+234 90 5167 8901'}
        </span>
      </span>
      <form className="w-full px-6" onSubmit={handleSubmit}>
        <div className="flex w-full mt-8 mb-8 items-center justify-between">
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
        <Button title="Submit" classNames="h-[48px] w-full rounded-[90px]" />
      </form>
    </div>
  )
}

export default EmailVerificationModal

const Input = ({ value }: { value?: string }) => {
  return (
    <input
      type={'number'}
      className="w-[90px] h-[96px] bg-[#F4F5F6] focus:outline-blue-300 px-4 text-center rounded-[8px] flex items-center justify-center font-popins font-semibold text-[23px]"
      value={value}
    />
  )
}
