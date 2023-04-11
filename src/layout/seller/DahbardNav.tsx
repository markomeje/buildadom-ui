/* eslint-disable @next/next/no-img-element */
import Logo from '@/components/Logo'
import Button from '@/components/shared/Button'
import { Links } from '@/utils/info'
import Link from 'next/link'
import React from 'react'
import TopNav from './TopNav'

const DashboardNav = () => {
  return (
    <div className="sticky top-0 z-40">
      <TopNav />
      <nav className="h-[92px] bg-white shadow-sm sticky top-0 w-full">
        <div className="wrapper flex items-center justify-between h-full">
          <Logo img="/assets/logo.png" />
          <NavLinks />
          <IconRight />
        </div>
      </nav>
    </div>
  )
}

export default DashboardNav

const NavLinks = () => {
  return (
    <ul className="flex items-center justify-between">
      {Links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="font-poppins text-black font-semibold mr-6 text-[14px] leading-[21px]"
        >
          {link.name}
        </Link>
      ))}
      <Button
        type="outline"
        title="Orders"
        classNames="w-[115px] h-[37px] ml-4  rounded-[50px]"
      />
    </ul>
  )
}

const IconRight = () => {
  return (
    <div className="flex items-center justify-between">
      <i className="ri-search-2-line font-semibold text-[20px] mr-5"></i>
      <div className="relative">
        <i className="ri-shopping-cart-line mr-5 text-[20px] font-semibold"></i>
        <span className="w-[15px] h-[15px] absolute left-3 flex items-center justify-center -top-1 text-[12px] p-[8px] rounded-[15px] text-white bg-bd-blue">
          2
        </span>
      </div>
      <img
        src="/assets/profile.png"
        alt="profile"
        className="w-[36px] h-[36px] rounded-[36px] object-cover"
      />
    </div>
  )
}