/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/hooks/useReducer'
import UseStepper from '@/hooks/useStepper'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import React from 'react'
import { AuthIndividualStepper } from '.'

const IndividualDetails = () => {
  const { show } = useAppSelector((state) => state.modal)
  const { step } = useAppSelector((state) => state.step)
  return (
    <>
      {show && step === 2 && (
        <ModalWraper>
          <EmailVerificationModal />
        </ModalWraper>
      )}
      <UseStepper step={step} stepObject={AuthIndividualStepper} />
    </>
  )
}

export default IndividualDetails
