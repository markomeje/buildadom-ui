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

const LogoutModal = ({ close }: { close: () => void }) => {
  const router = useRouter()
  const logout = () => {
    close()
    removeUserCookie()
    router.push('/')
  }
  return (
    <button
      className="w-[180px] py-2 shadow-md absolute right-4 bg-white border border-gray-200 px-4 flex items-center"
      onClick={logout}
    >
      <i className="ri-logout-circle-r-line "></i>
      <span className="font-poppins ml-2 text-[16px]  font-[500]">Logout</span>
    </button>
  )
}

const MerchantNav = () => {
  const [mobileDisplay, setMobileDisplay] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const toggle = () => {
    setMobileDisplay(!mobileDisplay)
  }
  const logoutToggle = () => {
    setLogoutModal(!logoutModal)
  }

  const closeLogoutModal = () => {
    setLogoutModal(false)
  }

  return (
    <div className="sticky w-full top-0 z-20">
      <TopNav />
      <nav className="h-[92px] px-5 lg:px-0  bg-white shadow-sm sticky top-0 w-full">
        <div className="lg:wrapper flex items-center justify-between h-full">
          <Logo img="/assets/logo.png" />
          <i
            className={`ri-menu-3-fill text-[28px] block lg:hidden`}
            onClick={toggle}
          ></i>
          <div className="hidden lg:flex items-center ">
            <img
              src="/assets/profile.png"
              alt="profile"
              className="w-[36px] h-[36px] mr-2 hidden lg:block rounded-[36px] object-cover cursor-pointer"
            />
            <i
              className="ri-arrow-down-s-line hidden lg:block  cursor-pointer text-gray-500  text-[20px]"
              onClick={logoutToggle}
            ></i>
          </div>
        </div>
      </nav>
      {logoutModal && <LogoutModal close={closeLogoutModal} />}

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
