import { useAppSelector } from '@/hooks/useReducer'
import React from 'react'
import List from './ListSteper'

const StoreStepper = () => {
  const { step } = useAppSelector((state) => state.step)

  return (
    <div className="flex  w-[300px]">
      <List initStep={1} currentStep={step} />
      <List initStep={2} currentStep={step} />
    </div>
  )
}

export default StoreStepper
