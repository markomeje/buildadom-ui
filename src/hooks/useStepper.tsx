/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

type IProps = {
  step: number
  stepObject: any
}

function UseStepper({ step, stepObject }: IProps) {
  return stepObject[step]
}

export default UseStepper
