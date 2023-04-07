import LandingPage from '@/layouts/LandingPage'
import CallToAction from '@/sections/CallToAction'
import FAQ from '@/sections/FAQ'
import FirstSection from '@/sections/FirstSection'
import HeroBg from '@/sections/HeroBg'
import Materials from '@/sections/Material'
import Property from '@/sections/Properties'
import Safety from '@/sections/Safety'
import Support from '@/sections/Support'
import React, { ReactElement } from 'react'

function HomePage() {
  return (
    <>
      <HeroBg />
      <FirstSection />
      <Property />
      <CallToAction />
      <Materials />
      <Safety />
      <Support />
      <FAQ />
    </>
  )
}

export default HomePage

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LandingPage>{page}</LandingPage>
}
