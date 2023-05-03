import DashboardNav from './DashboardNav'
import Footer from './Footer'

type IProps = {
  children: React.ReactNode
}

function MainLayout({ children }: IProps) {
  return (
    <section>
      <DashboardNav />
      <main>{children}</main>
      <Footer />
    </section>
  )
}

export default MainLayout
