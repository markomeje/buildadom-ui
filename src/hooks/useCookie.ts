import { IAuthToken } from '@/interface/form.interface'
import { setCookie, getCookie } from 'cookies-next'

export const addBrowserCookie = (cookie: IAuthToken) => {
  setCookie('user', cookie, {
    path: '/',
  })
}

export const getUserCookie = (value: string) => {
  return getCookie(value)
}
