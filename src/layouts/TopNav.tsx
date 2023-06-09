import Link from 'next/link'
import React from 'react'

function TopNav() {
  return (
    <div className={`w-full hidden md:block bg-bd-black py-4`}>
      <div className="flex justify-between items-center wrapper h-full w-full">
        <div className="flex items-center">
          <span className="text-[#8C8C8C] font-poppins font-[800] leading-[18px] flex items-center">
            Mon-Sat :{' '}
            <span className="text-white flex items-center ml-2">
              9:00am - 5:00pm{' '}
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
          <span>Call Us: (+234) 8119736227</span>
          <Link
            href={
              'https://www.facebook.com/profile.php?id=100069804551217&mibextid=ZbWKwL'
            }
            target="_blank"
          >
            {' '}
            <i className="ri-facebook-fill px-2 ml-2"></i>
          </Link>
          <Link
            href={'https://instagram.com/buildadom?igshid=MzNlNGNkZWQ4Mg=='}
            target="_blank"
          >
            <i className="ri-instagram-fill ml-2"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopNav
