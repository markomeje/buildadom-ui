import Button from '@/components/shared/Button'
import React from 'react'

const CallToAction = () => {
  return (
    <div className="w-full min-h-[416px] backdrop mt-8 flex flex-col items-center justify-center">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center">
        <span className="text-center font-poppins text-[40px] mb-7 text-white leading-[60px]">
          Sign up now and be among the first people to enjoy our amazing
          features when we launch
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
