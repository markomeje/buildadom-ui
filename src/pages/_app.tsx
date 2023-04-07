import '../styles/globals.css'
import  {  AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import { ReactElement, ReactNode } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-number-input/style.css'
import { ToastContainer } from 'react-toastify'


type PageWithLayout = {
  getLayout: (page: ReactElement) => ReactNode
}

// define custom _app properties for components with individual layouts
type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

const  MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)



