export interface IStore {
  address: string
  city: string
  description: string
  images?: { id: number; url: string; role: string }[]
  name: string
  id: number
  user_id: number
  published: 0 | 1
}
