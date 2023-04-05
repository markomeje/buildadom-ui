import { useAppSelector } from '@/hooks/useReducer'
import React from 'react'
import List from './steppers/ListSteper'

function Stepper({ className }: { className?: string }) {
  const { step } = useAppSelector((state) => state.step)
  return (
    <ol
      className={`flex w-[60%] mx-auto justify-center my-6 items-center ${className}`}
    >
      <List initStep={1} currentStep={step} />
      <List initStep={2} currentStep={step} />
      <List initStep={3} currentStep={step} />
    </ol>
  )
}

export default Stepper
