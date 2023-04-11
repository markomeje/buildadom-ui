/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getIDTypes: builder.query<any, void>({
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
  }),
})

export const { useGetIDTypesQuery } = utilityApi
