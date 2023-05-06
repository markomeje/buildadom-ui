export interface CreateStore {
  name: string
  description: string
  country_id: string
  address: string
  city: string
}

export interface Country {
  id: number
  name: string
  capital: string
  iso2: string
}

export interface City {
  id: number
  name: string
}

export interface IReact {
  children: React.ReactNode
}

export interface IProduct {
  id?: number
  img: string
  rating: number
  reviews: string
  description: string
  price: string
  name: string
  redirectLink?: string
}

export interface IDropdown {
  close: () => void
  show: boolean
}
