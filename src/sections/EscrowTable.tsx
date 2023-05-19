import Button from '@/ui/button/Button'
import React, { useState } from 'react'

const EscrowTable = () => {
  const [state, setState] = useState('1')
  const active = 'font-semibold lg:border-b-4 border-bd-blue font-black'
  const inActive = 'text-[#979797] '
  return (
    <div className="w-[95%] lg:w-full mt-10">
      <div className="w-full flex items-center justify-between border-b border-[#CCCCCC]">
        <div className="">
          <span
            className={`${
              state === '1' ? active : inActive
            } mr-6  pb-3 cursor-pointer  font-poppins `}
            onClick={() => setState('1')}
          >
            Pending Release
          </span>
          <span
            className={`${
              state === '2' ? active : inActive
            } cursor-pointer pb-3 font-poppins `}
            onClick={() => setState('2')}
          >
            Released Funds
          </span>
        </div>
        <Button
          title="clear all"
          classNames="border hidden lg:block px-8 mb-2  py-2 text-black font-[400] border-[#CCCCCC] "
          type="outline"
        />
      </div>

      <div className="py-12 flex items-center justify-center">
        <span className="font-poppins text-[20px] text-gray-500 ">
          No Table Data
        </span>
      </div>
    </div>
  )
}

export default EscrowTable
