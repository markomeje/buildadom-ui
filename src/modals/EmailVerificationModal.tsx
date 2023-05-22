/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from '@/interface/error.interface'
import OtpInput from '@/lib/OTPInput'
import { incrementStepper } from '@/redux/reducer/stepperReducer'
import { setToken, setUser } from '@/redux/reducer/tokenReducer'
import { useVerifyNumberMutation } from '@/redux/services/auth.service'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EmailVerificationModal = ({ status }: { status?: string }) => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [type, setType] = useState<string>('phone')
  const [verifyNumber, { isLoading }] = useVerifyNumberMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (status) {
      setType(status as string)
    }
  }, [status])
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return toast.error('complete code')
    try {
      if (type === 'phone') {
        const data = { type: 'phone', code: otp }
        await verifyNumber(data).unwrap()
        toast.success('Phone verfication successfull, check you mail please ')
        dispatch(incrementStepper())
        setOtp('')
      }
      if (type === 'email') {
        const data = { type: 'email', code: otp }
        const res = await verifyNumber(data).unwrap()
        if (res && res.user) {
          dispatch(setToken({ token: res.user.token }))
          dispatch(setUser({ token: res.user.token }))
          toast.success('Email verfication successfull')
          router.push('/merchant/register/success')
        }
      }
    } catch (error) {
      console.log(error, 'error')
      toast.error((error as AuthError).data.message)
    }
  }

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
        <OtpInput
          value={otp}
          valueLength={6}
          onChange={(value: string) => setOtp(value)}
        />
        <div className="flex flex-col w-full items-center justify-center">
          <Button
            title={isLoading ? 'loading...' : 'Submit'}
            classNames="h-[40px] text-[15px] w-[150px] py-2 flex items-center justify-center rounded-[20px]"
          />
          <p className="py-2 text-gray-800 mt-2 font-poppins text-[16px]">
            No recieved OTP?{' '}
            <span className="text-bd-blue underline font-semibold pl-1">
              Click to resend
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default EmailVerificationModal
