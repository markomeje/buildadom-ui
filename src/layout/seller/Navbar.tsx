import Logo from '@/components/Logo'
import Button from '@/components/shared/Button'
// import { useAppSelector } from '@/hooks/useReducer'
import { useRouter } from 'next/router'
import React from 'react'
import TopNav from './TopNav'

function Navbar() {
  // const [height, setHeight] = useState(0)
  // useEffect(() => {
  //   setHeight(document.documentElement.scrollHeight)
  // })

  const router = useRouter()
  const isReg = router.pathname === '/seller/register'
  const redirect = () => {
    router.push(`/seller/${isReg ? 'login' : 'register'}`)
  }
  return (
    <div className={` `}>
      <TopNav />
      <nav className="h-[92px] bg-white shadow-sm w-full">
        <div className="wrapper flex items-center justify-between h-full">
          <Logo img="/assets/logo.png" />
          <Button
            title={`${isReg ? 'login' : 'Register'}`}
            classNames="px-[30px] py-[12px] text-[14px] font-poppins leading-[21px] rounded-[50px]"
            onClick={redirect}
          />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
