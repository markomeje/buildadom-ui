// import { IProduct } from '@/interface/general.interface'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IData {
  url: string
  id: number
  role: string
}

export const locateImg = (
  data: IData[] | undefined,
  img_type: string
): string | undefined => {
  const result = data && data.find((x) => x.role.toLowerCase() === img_type)
  if (result) return result.url
  else return '/assets/placeholder.jpg'
}

export const locateId = (
  data: IData[] | undefined,
  img_type: string
): string => {
  const result = data && data.find((x) => x.role === img_type)
  if (result) return result.id.toString()
  else return '0'
}

export const locateMerchantProducts = (data: { [k: string]: any }[]): any => {
  const keys = Object.keys(data)
  return keys
}
