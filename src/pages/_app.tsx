import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-number-input/style.css'
// import { useAppDispatch } from '@/hooks/useReducer'
// import { setUser } from '@/redux/reducers/authToken_reducer'

// define custom types for components with individual layouts
type PageWithLayout = {
  getLayout: (page: ReactElement) => ReactNode
}

// define custom _app properties for components with individual layouts
type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const dispatch = useAppDispatch()
  // const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  // useEffect(() => {
  //   dispatch(setUser(token))
  // }, [])
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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
