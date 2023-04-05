import React from 'react'

const List = ({
  currentStep,
  initStep,
}: {
  currentStep: number
  initStep: number
}) => {
  const active = currentStep === initStep
  const greater = currentStep > initStep
  console.log(greater, currentStep, initStep)
  return (
    <li
      className={`flex w-full items-center before:border-b before:h-[2px] before:border-[${
        active ? '#0156FF' : '#CCCCCC'
      }]   after:content-[''] after:w-full before:content-[''] after:h-[2px] after:border-b after:border-[${
        active ? '#0156FF' : '#CCCCCC'
      }] after:border-2 before:border-2 after:inline-block before:w-full before:inline-block`}
    >
      <span
        className={`min-w-[30px] min-h-[30px] flex items-center justify-center border-[#0156FF] border-2 rounded-[30px] ${
          active && 'bg-[#0156FF]'
        }`}
      >
        {greater && (
          <i className="ri-check-fill text-[17px] font-semibold text-[#0156FF]"></i>
        )}
      </span>
    </li>
  )
}

export default List
