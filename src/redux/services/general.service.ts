/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IProduct } from '@/interface/general.interface'
import { IStore } from '@/interface/store.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// auth service build

export const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { accept: 'application/json' },
  }),
  endpoints: (builder) => ({
    // QUERIES
    allProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: '/products',
        keepUnusedDataFor: 0.0001,
      }),
      transformResponse: (
        response: { products: { data: IProduct[] } },
        meta,
        arg
      ) => {
        return response.products.data
      },
      transformErrorResponse: (response) => {
        console.log(response)
        return response
      },
    }),

    getProductDetails: builder.query<IProduct, number>({
      query: (id) => ({ url: `/products/product/${id}` }),
      transformResponse: (response: { product: IProduct }, meta, arg) => {
        return response.product
      },
      transformErrorResponse: (response) => {
        return response
      },
    }),

    allStores: builder.query<IStore[], number>({
      query: (limit: number) => ({
        url: `stores?limit=${limit}`,
      }),
      transformResponse: (
        response: { stores: { data: IStore[] } },
        meta,
        arg
      ) => {
        return response.stores.data
      },
      transformErrorResponse: (response) => {
        return response
      },
    }),

    getStoreDetails: builder.query<IStore, number>({
      query: (id) => ({ url: `/stores/store/${id}` }),
      transformResponse: (response: { store: IStore }, meta, arg) => {
        return response.store
      },
      transformErrorResponse: (response) => {
        return response
      },
    }),

    getQueryByCategory: builder.query<IProduct[], number>({
      query: (category) => ({
        url: `products/category/${category}`,
      }),
      transformResponse: (response: { products: IProduct[] }) => {
        return response.products
      },
    }),
  }),
})

export const {
  useGetProductDetailsQuery,
  useGetStoreDetailsQuery,
  useAllProductsQuery,
  useGetQueryByCategoryQuery,
  useAllStoresQuery,
} = generalApi
