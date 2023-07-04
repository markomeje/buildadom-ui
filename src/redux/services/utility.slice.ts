/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export interface ICurrency {
  id: number
  name: string
  symbol: string
  code: string
  active: boolean
}

export interface IResponse {
  label: string
  value: string | number
}

export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { accept: 'application/json' },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getIDTypes: builder.query<IResponse[], void>({
      query: () => ({
        url: '/identification/types',
        method: 'GET',
      }),
      transformResponse: (response: { types: string[] }, meta, arg) =>
        response.types.map((type: string) => {
          return {
            value: type,
            label: type.toUpperCase(),
          }
        }),
    }),

    getCurrencies: builder.query<IResponse[], void>({
      query: () => ({
        url: '/currencies',
        method: 'GET',
      }),
      transformResponse: (response: { currencies: ICurrency[] }, meta, arg) =>
        response.currencies.map((currency: ICurrency) => {
          return {
            value: currency.id,
            label: `${currency.code} (${currency.symbol})`,
          }
        }),
    }),
  }),
})

export const { useGetIDTypesQuery, useGetCurrenciesQuery } = utilityApi
