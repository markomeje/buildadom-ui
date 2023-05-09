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
}

export interface IValidationForm {
  id_type: string
  id_number: string
  expiry_date: string
  address: string
  dob: string
}

export interface IBank {
  accountName: string
  accountNumber: string
  bankName: string
}
