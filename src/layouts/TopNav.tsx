import Link from 'next/link'
import React from 'react'

function TopNav() {
  return (
    <div className={`w-full hidden md:block bg-bd-black py-4`}>
      <div className="flex justify-between items-center wrapper h-full w-full">
        <div className="flex items-center">
          <span className="text-[#8C8C8C] font-poppins font-[800] leading-[18px] flex items-center">
            Mon-Thu :{' '}
            <span className="text-white flex items-center ml-2">
              9:00am - 5:30pm{' '}
              <i className="ri-arrow-drop-down-line text-white"></i>
            </span>
          </span>
        </div>
        <div className="flex text-[#ACACAC] items-center">
          <span className="font-poppins">
            For advert placements & store features on Buildadom
          </span>
          <Link
            href={''}
            className="font-bold font-poppins ml-2 text-white underline "
          >
            Contact Us
          </Link>
        </div>
        <div className="flex text-white items-center">
          <span>Call Us: (00) 1234 5678</span>
          <i className="ri-facebook-fill px-2 ml-2"></i>
          <i className="ri-instagram-fill ml-2"></i>
        </div>
      </div>
    </div>
  )
}

export default TopNav
