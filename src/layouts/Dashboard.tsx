import { useTypedSelector } from '@/redux/store'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import DashboardNav from './DashboardNav'
import Footer from './Footer'

type IProps = {
  children: React.ReactNode
}

function Dashboard({ children }: IProps) {
  const router = useRouter()
  const { loggedUser } = useTypedSelector((state) => state.authToken)
  useEffect(() => {
    if (!loggedUser) {
      router.push('/')
    }
  }, [router, loggedUser])
  return (
    <div>
      <DashboardNav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Dashboard
