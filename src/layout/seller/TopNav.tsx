import Link from 'next/link'
import React from 'react'

function TopNav() {
  return (
    <div className="w-full bg-bd-black py-3">
      <div className="flex justify-between items-center wrapper h-full w-full">
        <div className="flex items-center">
          <span className="text-white flex items-center">
            Mon-Thu :{' '}
            <span>
              9:00am - 5:30pm{' '}
              <i className="ri-arrow-drop-down-line text-white"></i>
            </span>
          </span>
        </div>
        <div className="flex text-white items-center">
          <span>For advert placements & store features on House Depot</span>
          <Link href={''}>Contact Us</Link>
        </div>
        <div className="flex text-white items-center">
          <span>Call Us: (00) 1234 5678</span>
          <i className="ri-facebook-circle-fill"></i>
          <i className="ri-instagram-fill"></i>
        </div>
      </div>
    </div>
  )
}

export default TopNav
