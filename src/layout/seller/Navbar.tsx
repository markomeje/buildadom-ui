import Logo from '@/components/Logo'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/router'
import React from 'react'
import TopNav from './TopNav'

function Navbar() {
  const router = useRouter()
  const redirect = () => {
    router.push('/seller/register')
  }
  return (
    <div>
      <TopNav />
      <nav className="h-[92px] bg-white shadow-sm sticky top-0 w-full">
        <div className="wrapper flex items-center justify-between h-full">
          <Logo />
          <Button
            title="Register"
            classNames="px-[30px] py-[12px] text-[14px] font-poppins leading-[21px] rounded-[50px]"
            onClick={redirect}
          />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
