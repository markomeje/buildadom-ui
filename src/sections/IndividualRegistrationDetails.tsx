import UseStepper from '@/hooks/useStepper'
import { VerificationStepper } from '@/lib/stepper'
import ModalWraper from '@/modals'
import { useTypedSelector } from '@/redux/store'
import MechantIndividualRegistration from '@/ui/forms/MechantIndividualRegistration'
import React from 'react'

const IndividualDetails = () => {
  const { show } = useTypedSelector((state) => state.modal)
  const { step } = useTypedSelector((state) => state.stepper)

  return (
    <>
      {show && (
        <ModalWraper>
          <UseStepper step={step} stepObject={VerificationStepper} />
        </ModalWraper>
      )}
      <MechantIndividualRegistration />
    </>
  )
}

export default IndividualDetails
