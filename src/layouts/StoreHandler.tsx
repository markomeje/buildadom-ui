import SideLinks from '@/ui/Links/SideLinks'
import React from 'react'
import { sideLinks } from '@/util/sideLinks'

const StoreHandler = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full lg:border min-h-[600px] border-[#CCCCCC] lg:py-12">
      <div className="lg:wrapper  flex ">
        <SideLinks links={sideLinks} />
        <main className="w-full h-full ml-4 flex flex-col">{children}</main>
      </div>
    </div>
  )
}

export default StoreHandler
