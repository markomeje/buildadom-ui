/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import TopNav from './TopNav'
import Logo from '@/ui/general/Logo'
import { removeUserCookie } from '@/hooks/useCookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { sideLinks } from '@/util/sideLinks'
import { IDropdown } from '@/interface/dashboard'

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
            className={`ri-menu-3-fill text-[28px] block lg:hidden`}
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

      <MobileDropDown
        show={mobileDisplay}
        close={() => setMobileDisplay(false)}
      />
    </div>
  )
}

export default MerchantNav

const MobileDropDown = ({ show, close }: IDropdown) => {
  const router = useRouter()
  return (
    <div className={`w-full  shadow-lg`}>
      <div
        className={`${
          show ? 'flex' : 'hidden'
        } flex-col bg-gray-600 min-h-[300px] sldier py-2 pl-2 justify-center absolute  w-full`}
      >
        {sideLinks.map((link, index) => {
          const active = router.pathname === link.link
          return (
            <Link
              href={link.link}
              onClick={close}
              key={index}
              className={`py-2  mb-2 ${
                active && 'text-[16px] font-semibold'
              }  pl-4 font-poppins text-[16px] leading-[22px] text-white`}
            >
              {' '}
              {link.name}{' '}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
