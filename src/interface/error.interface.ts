/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAuthError {
  success: boolean
  message: string
  errors: { [k: string]: string[] }
  verification?: any
  name: string[]
}

export interface AuthError {
  status: number
  data: IAuthError
  message?: string
}
