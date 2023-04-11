import List from '@/components/ListStepper'
import { useTypedSelector } from '@/redux/store'
import React from 'react'

const StoreStepper = () => {
  const { step } = useTypedSelector((state) => state.stepper)

  return (
    <div className="flex  w-[300px]">
      <List initStep={1} currentStep={step} />
      <List initStep={2} currentStep={step} />
    </div>
  )
}

export default StoreStepper
