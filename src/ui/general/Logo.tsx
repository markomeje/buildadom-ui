/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'

const Logo = ({ img }: { img: string }) => {
  const router = useRouter()
  const redirect = () => {
    router.push('/')
  }
  return (
    <div className="h-auto w-[140px] md:w-[185px] cursor-pointer" onClick={redirect}>
      <img src={img} alt="logo" className="w-fulll h-full" />
    </div>
  )
}

export default Logo
