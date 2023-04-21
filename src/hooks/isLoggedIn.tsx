import { getUserCookie } from './useCookie'

const IsLogged = () => {
  const isLog = getUserCookie('user') ? true : false
  return [isLog]
}

export default IsLogged
