import { IProduct } from './general.interface'

export interface IStore {
  address: string
  city: string
  products?: IProduct[]
  description: string
  images?: { id: number; url: string; role: string }[]
  name: string
  id: number
  user_id: number
  published: 0 | 1
}
