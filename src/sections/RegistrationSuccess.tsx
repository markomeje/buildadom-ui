/* eslint-disable @next/next/no-img-element */
import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
import React from 'react'

const SignupSuccess = () => {
  const router = useRouter()
  const redirect = (link: string) => {
    router.push(link)
  }
  return (
    <div className="max-w-[800px] py-8 flex flex-col mx-auto justify-center items-center">
      <img
        src="/assets/radial.png"
        alt="signup_success"
        className="w-[166px] h-[166px] mb-3"
      />
      <h2 className="font-semibold py-3 font-poppins text-[#2C8AFF] leading-[60px] text-[40px]">
        Sign Up Completed
      </h2>
      <p className="text-[18px] leading-[27px] w-full text-center font-poppins py-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, odio.
        Nam, dolore. Quaerat totam maiores nostrum, fugit deserunt nam enim.
      </p>
      <div className="flex py-3">
        <Button
          onClick={() => redirect('/dashboard')}
          title="Skip"
          type="outlined"
          classNames="mr-6 py-4 rounded-[8px] w-[200px] "
        />
        <Button
          onClick={() => redirect('/dashboard/verifyId')}
          title="Id Verification"
          classNames="py-4 rounded-[8px] w-[200px]"
        />
      </div>
    </div>
  )
}

export default SignupSuccess
