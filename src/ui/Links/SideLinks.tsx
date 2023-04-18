import { sideLinks } from '@/util/sideLinks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SideLinks = () => {
  // const [displaySideModal, setDisplaySideModal] = useState<boolean>(false)
  const router = useRouter()
  // const toggle = () => {
  //   setDisplaySideModal(!displaySideModal)
  // }
  return (
    <div className="relative">
      {/* <i
        className="ri-menu-fill lg:hidden text-[20px] pl-2"
        onClick={toggle}
      ></i> */}
      <div
        className={`min-w-[290px] bg-bd-lightBlue mr-4  relative top-0 h-[300px] pr-3 lg:flex hidden lg:flex-col py-[14px] `}
      >
        {/* <i
          className="ri-close-fill absolute right-0 text-gray-500 top-1 lg:hidden text-[20px] pr-2"
          onClick={() => setDisplaySideModal(false)}
        ></i> */}
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
    </div>
  )
}

export default SideLinks
