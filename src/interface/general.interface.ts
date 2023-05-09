import { IData } from '@/util/locateImg'

export interface IReact {
  children: React.ReactNode
}
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
  isOwner?: boolean
  img: string
  images?: IData[]
  rating: number
  reviews: string
  currency?: { symbol: string }
  description: string
  published?: number
  price: string
  name: string
}

export interface ICategory {
  id: number
  name: string
  label?: string
}
