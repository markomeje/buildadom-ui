/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAuthError {
  success: boolean
  message: string
  errors: { [k: string]: string[] }
  verification?: any
}

export interface AuthError {
  status: number
  data: IAuthError
  message?: string
}
