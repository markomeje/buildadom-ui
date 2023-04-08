import DashboardNav from './DashboardNav'
import Footer from './Footer'

type IProps = {
  children: React.ReactNode
}

function Dashboard({ children }: IProps) {
  return (
    <div>
      <DashboardNav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Dashboard
