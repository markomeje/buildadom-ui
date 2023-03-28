interface IAuthError {
  success: boolean
  message: string
  errors: { [k: string]: string[] }
}

export interface AuthError {
  status: number
  data: IAuthError
  message?: string
}
