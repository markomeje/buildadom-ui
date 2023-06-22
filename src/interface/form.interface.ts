import { IUser } from './auth'

export interface IndividalMechant {
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  confirm_password: string
}

export interface BusinessMerchant {
  website: string
  business_name: string
  cac_number: string
  email: string
  phone: string
  address: string
  password: string
  confirm_password: string
}

export interface LoginProp {
  email: string
  password: string
}

export interface IAuthToken {
  token?: string | null
  loggedUser?: string | null
  userDetails?: IUser | null
}

export interface IValidationForm {
  firstname?: string
  state?: string
  is_business?: boolean
  id_type: string
  id_number: string
  expiry_date: string
  address: string
  dob: string
}

export interface IBank {
  account_name: string
  account_number: string
  bank: string
}

export interface IDriver {
  firstname: string
  lastname: string
  phone: string
}

export interface IShippingDetails {
  street_address: string
  // phone: string
  zip_code: string
}
