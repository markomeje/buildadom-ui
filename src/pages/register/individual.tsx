import LandingPage from '@/layouts/LandingPage'
import IndividualDetails from '@/sections/IndividualRegistrationDetails'
import React, { ReactElement } from 'react'

const RegisterIndividual = () => {
  return (
    <div className="max-w-[900px] mx-auto w-full flex flex-col py-16">
      <IndividualDetails />
    </div>
  )
}

export default RegisterIndividual

RegisterIndividual.getLayout = function getLayout(page: ReactElement) {
  return <LandingPage>{page}</LandingPage>
}
