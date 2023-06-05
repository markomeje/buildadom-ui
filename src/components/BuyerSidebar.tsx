import React from 'react'
import SideLinks from '../ui/Links/SideLinks'
import { buyerLinks } from '@/util/sideLinks'

const BuyerSidebar = ({
  header,
  children,
}: {
  header: string
  children: React.ReactNode
}) => {
  return (
    <div className="wrapper py-8">
      <h1 className="font-semibold text-[30px] capitalize leading-[48px] font-poppins mb-4">
        {header}
      </h1>
      <div className="flex">
        <SideLinks links={buyerLinks} />
        <div className="ml-8 w-full -mt-2">{children}</div>
      </div>
    </div>
  )
}

export default BuyerSidebar
