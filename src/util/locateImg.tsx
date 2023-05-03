/* eslint-disable @typescript-eslint/no-explicit-any */
interface IData {
  url: string
  role: string
}

export const locateImg = (
  data: IData[] | undefined,
  img_type: string
): string | undefined => {
  const result = data && data.find((x) => x.role === img_type)
  if (result) return result.url
}

export const locateMerchantProducts = (data: any) => {
  const keys = Object.keys(data)
  return keys
}
