import LandingPage from '@/layouts/LandingPage'
import SignupSuccess from '@/sections/RegistrationSuccess'
import React, { ReactElement } from 'react'

const SuccessPage = () => {
  return <SignupSuccess />
}

export default SuccessPage

SuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <LandingPage>{page}</LandingPage>
}
