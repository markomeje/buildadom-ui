import Button from '@/ui/button/Button'
import React from 'react'

const CallToAction = () => {
  return (
    <div className="w-full min-h-[600px] md:min-h-[416px] backdrop mt-8 bg-fixed flex flex-col items-center justify-center">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center">
        <span className="text-center font-poppins text-[34px] md:text-[40px] mb-7 px-4 lg:px-0 text-white leading-[54px]  lg:leading-[60px]">
          Sign up now to enjoy our amazing features.
        </span>
        <Button
          title="Sign Up Now"
          classNames="py-[18px] px-[54px] w-[230px] rounded-[82px]"
        />
      </div>
    </div>
  )
}

export default CallToAction
