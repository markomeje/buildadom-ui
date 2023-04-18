/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import TopNav from './TopNav'
import Logo from '@/ui/general/Logo'
import { removeUserCookie } from '@/hooks/useCookie'
import { useRouter } from 'next/router'

const MerchantNav = () => {
  const [mobileDisplay, setMobileDisplay] = useState(false)
  const toggle = () => {
    setMobileDisplay(!mobileDisplay)
  }
  const router = useRouter()
  const logout = () => {
    removeUserCookie()
    router.push('/')
  }
  return (
    <div className="sticky top-0 z-20">
      <TopNav />
      <nav className="h-[92px] px-5 lg:px-0  bg-white shadow-sm sticky top-0 w-full">
        <div className="lg:wrapper flex items-center justify-between h-full">
          <Logo img="/assets/logo.png" />
          <i
            className="ri-menu-3-fill text-[28px] block lg:hidden"
            onClick={toggle}
          ></i>
          <img
            src="/assets/profile.png"
            alt="profile"
            className="w-[36px] h-[36px] hidden lg:block rounded-[36px] object-cover cursor-pointer"
            onClick={logout}
          />
        </div>
      </nav>
      {/* <MobileDropDown
        show={mobileDisplay}
        toggle={toggle}
        open={() => setMobileDisplay(true)}
        close={() => setMobileDisplay(false)}
      /> */}
    </div>
  )
}

export default MerchantNav

// const MobileDropDown = ({ show, toggle, open, close }) => {
//   return (
//     <div
//       className={`${
//         show ? 'flex' : 'hidden'
//       } flex-col items-end justify-end bg-gray-100 min-h-screen w-[45%]`}
//     ></div>
//   )
// }

{
  /* <i
        className={`ri-close-fill absolute top-0 left-0 p-4 text-gray-200 font-bold text-[28px] block lg:hidden`}
        onClick={close}
      ></i> */
}
