import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type IProps = {
  children: React.ReactNode
}

const LandingPage = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default LandingPage
