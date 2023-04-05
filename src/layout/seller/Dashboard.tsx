import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import DashboardNav from './DahbardNav'
import Footer from './Footer'

type IProps = {
  children: React.ReactNode
}

function Dashboard({ children }: IProps) {
  const router = useRouter()
  let token: string
  if (typeof window !== 'undefined') {
    token = JSON.parse(localStorage.getItem('loggedInUser') as string)
  }
  useEffect(() => {
    if (!token) {
      router.push('/seller')
    }
  }, [router])
  return (
    <div>
      <DashboardNav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Dashboard
