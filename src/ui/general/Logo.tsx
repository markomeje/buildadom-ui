import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Logo = ({ img }: { img: string }) => {
  const router = useRouter()
  const redirect = () => {
    router.push(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string)
  }
  return (
    <div
      className="h-auto w-[140px] md:w-[185px] cursor-pointer"
      onClick={redirect}
    >
      <Image
        width={155}
        height={90}
        src={img}
        alt="logo"
        className="w-[155px] h-fit"
      />
    </div>
  )
}

export default Logo
