import { useAppSelector } from '@/hooks/useReducer'
import React from 'react'

function Stepper() {
  const { step } = useAppSelector((state) => state.step)
  console.log(step > 1)
  return (
    <ol className="flex w-full justify-center my-6 items-center max-w-[500px] mx-auto">
      <List initStep={1} currentStep={step} />
      <List initStep={2} currentStep={step} />
      {/* <List initStep={3} currentStep={step} /> */}
    </ol>
  )
}

export default Stepper

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
      className={`flex w-full items-center   after:content-[''] after:w-full before:content-[''] after:h-[2px] after:border-b after:border-[${
        active ? '#0156FF' : '#CCCCCC'
      }] after:border-2 after:inline-block`}
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
