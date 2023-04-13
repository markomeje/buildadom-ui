/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

// auth service build

export const generalApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
  }),
  tagTypes: ['Product', 'Store'],
  endpoints: (builder) => ({
    // QUERIES
    allProducts: builder.query<any, void>({
      query: () => ({
        url: '/products',
        keepUnusedDataFor: 0.0001,
      }),
      transformResponse: (response: { products: any }, meta, arg) => {
        return response.products
      },
    }),
  }),
})

export const { useAllProductsQuery } = generalApi
