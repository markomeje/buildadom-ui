import { useEffect } from 'react'
import { useTypedSelector } from '@/redux/store'
import { useRouter } from 'next/router'

const IsAuth = () => {
  const router = useRouter()
  const { loggedUser } = useTypedSelector((state) => state.authToken)

  useEffect(() => {
    if (!loggedUser) {
      router.push(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string)
    }
  }, [router, loggedUser])
}

export default IsAuth
