import  {useEffect} from 'react'
import { useTypedSelector } from '@/redux/store'
import { useRouter } from 'next/router'

const IsLogged = () => {
const router = useRouter()
const { loggedUser } = useTypedSelector((state) => state.authToken)

useEffect(() => {
  if (loggedUser) {
    router.push('/dashboard')
  }
}, [router, loggedUser])
}

export default IsLogged