import CallToAction from '@/components/sections/seller/CallToAction'
import FAQ from '@/components/sections/seller/FAQ'
import FirstSection from '@/components/sections/seller/FirstSection'
import HeroBg from '@/components/sections/seller/HeroBg'
import Materials from '@/components/sections/seller/Materials'
import Property from '@/components/sections/seller/Properties'
import Safety from '@/components/sections/seller/Safety'
import Support from '@/components/sections/seller/Support'
import SellerAuth from '@/layout/seller/Auth'
import React, { ReactElement } from 'react'

function Seller() {
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

export default Seller

Seller.getLayout = function getLayout(page: ReactElement) {
  return <SellerAuth>{page}</SellerAuth>
}
