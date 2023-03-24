import { useAppSelector } from '@/hooks/useReducer'
import React from 'react'

function Stepper() {
  const { step } = useAppSelector((state) => state.step)
  console.log(step > 1)
  return (
    <ol className="flex w-full justify-center my-6 items-center max-w-[500px] mx-auto">
      <li
        className={`flex w-full items-center   after:content-[''] after:w-full before:content-[''] after:h-[2px] after:border-b after:border-[${
          step > 1 ? '#0156FF' : '#CCCCCC'
        }] after:border-2 after:inline-block`}
      >
        <span
          className={`min-w-[30px] min-h-[30px] flex items-center justify-center border-[#0156FF] border-2 rounded-[30px] ${
            step === 1 && 'bg-[#0156FF]'
          }`}
        >
          {step > 1 && (
            <i className="ri-check-fill text-[17px] font-semibold text-[#0156FF]"></i>
          )}
        </span>
      </li>
      <li
        className={`flex w-full items-center   after:content-[''] after:w-full after:h-[2px] after:border-b after:border-[${
          step > 2 ? '#0156FF' : '#CCCCCC'
        }] after:border-2 after:inline-block`}
      >
        <span
          className={`${
            step === 2 && 'bg-[#0156FF]'
          } min-w-[30px] min-h-[30px] border-[${
            step >= 2 ? '#0156FF' : '#CCCCCC'
          }] border-2 rounded-[30px] flex items-center justify-center`}
        >
          {step > 2 && (
            <i className="ri-check-fill text-[17px] font-semibold text-[#0156FF]"></i>
          )}
        </span>
      </li>
      <li className="flex  items-center  ">
        <span
          className={`${
            step === 3 && 'bg-[#0156FF]'
          } min-w-[30px] min-h-[30px] border-[${
            step >= 3 ? '#0156FF' : '#CCCCCC'
          }] border-2 rounded-[30px] flex items-center justify-center`}
        >
          {' '}
          {step > 3 && (
            <i className="ri-check-fill text-[17px] font-semibold text-[#0156FF]"></i>
          )}
        </span>
      </li>
    </ol>
  )
}

export default Stepper
