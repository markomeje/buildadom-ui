/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/shared/Button'
import { useAppDispatch } from '@/hooks/useReducer'
import { AuthError } from '@/interface/errors'
import { setUser } from '@/redux/reducers/authToken_reducer'
import { useVerifyNumberMutation } from '@/redux/reducers/auth_reducer'
import { incrementStepper } from '@/redux/reducers/step_reducer'
import { VerificationCodeSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const EmailVerificationModal = ({ status }: { status?: string }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(VerificationCodeSchema),
  })
  const dispatch = useAppDispatch()
  const [type, setType] = useState<string>('phone')
  const [verifyNumber, { isLoading }] = useVerifyNumberMutation()
  useEffect(() => {
    if (status) {
      setType(status as string)
    }
  }, [status])
  const onSubmit = handleSubmit(async (info) => {
    try {
      const code = Object.values(info).join('')
      if (type === 'phone') {
        const data = { type: 'phone', code: code }
        await verifyNumber(data).unwrap()
        setType('email')
      }
      if (type === 'email') {
        const data = { type: 'email', code: code }
        const res = await verifyNumber(data).unwrap()
        if (res && res.user) {
          dispatch(setUser({ token: res.user.token }))
          dispatch(incrementStepper())
        }
      }
    } catch (error) {
      toast.error((error as AuthError).data.message)
    }
  })

  return (
    <div className="flex flex-col w-full h-full items-center p-[30px] justify-center">
      <h2 className=" text-[24px] font-semibold font-poppins leading-[40px] text-center ">
        Enter your security code
      </h2>
      <span className="font-poppins text-[15px] text-center max-w-[380px] mt-2 text-[#333333] leading-[20px]">
        Please kindly enter the OTP code we sent to <br />
        <span className="font-bold">
          {type === 'email' ? 'your email' : `your phone`}
        </span>
      </span>
      <form className="w-full px-6" onSubmit={onSubmit}>
        <div className="flex w-full mt-8 mb-8 items-center justify-between">
          <Inputs name="one" register={register} />
          <Inputs name="two" register={register} />
          <Inputs name="three" register={register} />
          <Inputs name="four" register={register} />
          <Inputs name="five" register={register} />
          <Inputs name="six" register={register} />
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            title={isLoading ? 'Loading...' : 'Submit'}
            classNames="h-[48px] w-[200px] flex items-center justify-center rounded-[90px]"
          />
        </div>
      </form>
    </div>
  )
}

export default EmailVerificationModal

const Inputs = ({ name, register }: { name: string; register: any }) => {
  return (
    <input
      type={'text'}
      min="1"
      max="1"
      className="w-[90px] h-[96px] bg-[#F4F5F6] mr-4 focus:outline-blue-300 px-4 text-center rounded-[8px] flex items-center justify-center font-popins font-semibold text-[23px]"
      {...register(name, { required: `${name} is required` })}
    />
  )
}
