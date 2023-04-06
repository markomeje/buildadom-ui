import Material from '@/components/Material'
import materials from '@/util/material'
import React from 'react'

const Materials = () => {
  return (
    <div className="min-h-[500px] mx-auto flex items-center justify-center mt-6 py-12">
      <div className="max-w-[950px] flex flex-col mx-auto">
        <h2 className="text-bd-blue font-poppins font-[700] text-[40px] text-center mb-2 leading-[54px]">
          Whatever you want to achieve, our stack of solutions are designed to
          help you succeed{' '}
        </h2>
        <div className="w-full grid mt-5 grid-cols-2 gap-10">
          <Material
            contents={materials[0]}
            bg="bg-[#F9F9F9]"
            header="Building material marketplace"
            icon="/assets/svg-1.svg"
          />
          <Material
            contents={materials[1]}
            bg="bg-[#F7F8FE]"
            header="Use our API to start taking orders and selling on your company’s website"
            icon="/assets/svg-2.svg"
          />
          <Material
            contents={materials[2]}
            bg="bg-[#F7F8FE]"
            header="Create and manage your digital store"
            icon="/assets/svg-3.svg"
          />
          <Material
            contents={materials[3]}
            bg="bg-[#F9F9F9]"
            header="Manage Procurement"
            icon="/assets/svg-4.svg"
          />
        </div>
      </div>
    </div>
  )
}

export default Materials
