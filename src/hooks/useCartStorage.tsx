/* eslint-disable @typescript-eslint/no-unused-vars */
import { IProduct } from '@/interface/dashboard'

export const addItem = (product: IProduct) => {
  const previousCart = getItems()
  const newCart = [...previousCart, product]
  localStorage.setItem('cart', JSON.stringify(newCart))
  getItems()
}

export const getItems = (): IProduct[] | [] => {
  if (typeof window !== 'undefined') {
    const currentCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') as string)
      : []
    return currentCart
  }
  return []
}

const getOneItems = (id: number): IProduct | undefined => {
  const items = getItems()
  return items.find((x) => x.id === id)
}

export const deleteItem = (id: number) => {
  const result = getItems().filter((x) => x.id !== id)
  localStorage.setItem('cart', JSON.stringify(result))
  getItems()
}

export const clearCartItems = () => {
  localStorage.removeItem('cart')
}

export const isItemFound = (id: string): boolean => {
  const found = getOneItems(parseInt(id))
  return found !== undefined ? true : false
}
