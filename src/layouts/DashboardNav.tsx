/* eslint-disable @next/next/no-img-element */
import { removeUserCookie } from '@/hooks/useCookie'
import Button from '@/ui/button/Button'
import Logo from '@/ui/general/Logo'
import { Links } from '@/util/info'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import TopNav from './TopNav'
import { IDropdown } from '@/interface/dashboard'
import IsLogged from '@/hooks/isLoggedIn'
import { useGetCartDetailsQuery } from '@/redux/services/cart.service'
import { useEffect } from 'react'
import { setUserDetails } from '@/redux/reducer/tokenReducer'
import { useTypedDispatch } from '@/redux/store'
import { useGetUserDetailsQuery } from '@/redux/services/merchant'

const DashboardNav = () => {
  const dispatch = useTypedDispatch()
  const { data } = useGetUserDetailsQuery()
  useEffect(() => {
    if (data) {
      dispatch(setUserDetails(data))
    }
  }, [dispatch, data])
  const [mobileDisplay, setMobileDisplay] = useState(false)
  const toggle = () => {
    setMobileDisplay(!mobileDisplay)
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
          <NavLinks />
          <IconRight />
        </div>
      </nav>
      <MobileDropDown
        show={mobileDisplay}
        close={() => setMobileDisplay(false)}
      />
    </div>
  )
}

export default DashboardNav

const NavLinks = () => {
  return (
    <ul className="lg:flex hidden items-center justify-between">
      {Links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="font-poppins text-black font-semibold mr-6 text-[14px] leading-[21px]"
        >
          {link.name}
        </Link>
      ))}
      {/* <Button
        type="outline"
        title="Orders"
        classNames="w-[115px] h-[37px] ml-4  rounded-[50px]"
      /> */}
    </ul>
  )
}

const IconRight = () => {
  const { data, isSuccess } = useGetCartDetailsQuery()
  console.log(data, 'data')
  const router = useRouter()
  const [isLog] = IsLogged()
  const logout = () => {
    removeUserCookie()
    router.push('/')
  }
  return (
    <div className="lg:flex hidden items-center justify-between">
      <i className="ri-search-2-line font-semibold text-[20px] mr-5"></i>
      <Link href={'/cart'} className="relative">
        <i className="ri-shopping-cart-line mr-5 text-[20px] font-semibold"></i>
        <span className="w-[15px] h-[15px] absolute left-3 flex items-center justify-center -top-1 text-[12px] p-[8px] rounded-[15px] text-white bg-bd-blue">
          {isSuccess ? data.total : 0}
        </span>
      </Link>
      {isLog ? (
        <img
          src="/assets/profile.png"
          alt="profile"
          className="w-[36px] h-[36px] rounded-[36px] object-cover cursor-pointer"
          onClick={logout}
        />
      ) : (
        <Link href={'/login'}>
          <Button
            title="Register / Login"
            classNames="w-[150px]  h-[37px] ml-4 text-[12px] tracking-wider font-400  rounded-[50px]"
          />
        </Link>
      )}
    </div>
  )
}

const MobileDropDown = ({ show, close }: IDropdown) => {
  const router = useRouter()
  return (
    <div className={`w-full shadow-lg`}>
      <div
        className={`${
          show ? 'flex' : 'hidden'
        } flex-col bg-gray-600 h-[300px] px-2 sldier justify-center absolute  w-full`}
      >
        {Links.map((link, index) => {
          const active = router.pathname === link.href
          return (
            <Link
              href={link.name}
              onClick={close}
              key={index}
              className={`py-2  mb-2 ${
                active && 'text-[16px] font-semibold'
              }  pl-4 font-poppins text-[17px] leading-[22px] text-white`}
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
