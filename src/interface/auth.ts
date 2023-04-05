export interface Form1 {
  firstname: string
  lastname: string
  email: string
  phonenumber: string
  password: string
  confirm_password: string
}

export interface Form2 {
  website: string
  business_name: string
  cac_number: string
  email: string
  phone: string
}

export interface Login {
  email: string
  password: string
}

export interface IValidationForm {
  id_type: string
  id_number: string
  expiry_date: string
  address: string
  dob: string
}

export interface IAuthToken {
  token: string | null
}
