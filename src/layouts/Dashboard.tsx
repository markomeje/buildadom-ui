import Footer from './Footer'
import MerchantNav from './MerchantNav'

type IProps = {
  children: React.ReactNode
}

function Dashboard({ children }: IProps) {
  return (
    <div>
      <MerchantNav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Dashboard
