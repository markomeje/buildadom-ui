export interface IStore {
  address: string
  city: string
  description: string
  images?: { id: number; url: string }[]
  name: string
  id: number
  user_id: number
}
