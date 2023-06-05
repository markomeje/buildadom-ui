import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SideLinks = ({ links }: { links: { name: string; link: string }[] }) => {
  const router = useRouter()
  console.log(router.pathname, 'patname')
  return (
    <div className="relative">
      <div
        className={`min-w-[290px] bg-bd-lightBlue mr-4  relative top-0 pr-3 lg:flex hidden lg:flex-col py-[14px] `}
      >
        {links.map((link, index) => {
          const active = router.pathname === link.link
          return (
            <Link
              href={link.link}
              scroll={false}
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
    </div>
  )
}

export default SideLinks
