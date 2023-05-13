/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IProduct } from '@/interface/general.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// auth service build

export const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.buildadom.net/api/v1',
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

    allStores: builder.query<any, number>({
      query: (limit: number) => ({
        url: `stores?limit=${limit}`,
      }),
      transformResponse: (response: { stores: { data: any } }, meta, arg) => {
        console.log(response, 'dddd')

        return response.stores.data
      },
      transformErrorResponse: (response) => {
        console.log(response)
        return response
      },
    }),

    getQueryByCategory: builder.query<any, { category: number }>({
      query: (category) => ({
        url: `products?limit=10&category=${category}`,
      }),
      transformResponse: (response: { products: IProduct[] }) => {
        return response.products
      },
    }),
  }),
})

export const {
  useAllProductsQuery,
  useGetQueryByCategoryQuery,
  useAllStoresQuery,
} = generalApi
