/* eslint-disable @typescript-eslint/no-unused-vars */
import LandingPage from '@/layouts/LandingPage'
import { wrapper } from '@/redux/store'
import CallToAction from '@/sections/CallToAction'
import FAQ from '@/sections/FAQ'
import FirstSection from '@/sections/FirstSection'
import HeroBg from '@/sections/HeroBg'
import Materials from '@/sections/Material'
import Property from '@/sections/Properties'
import Safety from '@/sections/Safety'
import Support from '@/sections/Support'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'
import { getCookie } from 'cookies-next'
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const token = getCookie('user', { req, res })
    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  })
