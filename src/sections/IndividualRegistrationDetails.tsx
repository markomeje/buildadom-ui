import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import { useTypedSelector } from '@/redux/store'
import MechantIndividualRegistration from '@/ui/forms/MechantIndividualRegistration'
import React from 'react'

const IndividualDetails = () => {
  const { show } = useTypedSelector((state) => state.modal)
  return (
    <>
      {show && (
        <ModalWraper>
          <EmailVerificationModal />
        </ModalWraper>
      )}
      <MechantIndividualRegistration />
    </>
  )
}

export default IndividualDetails
