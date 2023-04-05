import { sideLinks } from '@/utils/dashboard-side-links'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SideLinks = () => {
  const router = useRouter()
  return (
    <div className="min-w-[290px] bg-bd-lightBlue mr-4 h-[300px] pr-3 flex flex-col py-[14px]">
      {sideLinks.map((link, index) => {
        const active = router.pathname === link.link
        return (
          <Link
            href={link.link}
            key={index}
            className={`py-2  mb-2 ${
              active &&
              'border-bd-blue border-l-[3.4px] text-[16px] font-semibold'
            }  pl-4 font-poppins text-[15px] leading-[22px] text-[#666666]`}
          >
            {' '}
            {link.name}{' '}
          </Link>
        )
      })}
    </div>
  )
}

export default SideLinks
