/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const buyerApi = createApi({
  reducerPath: 'buerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { accept: 'application/json' },
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).authToken.loggedUser
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user}`)
      }
      return headers
    },
  }),
  tagTypes: ['Shipping'],
  endpoints: (builder) => ({
    createShipping: builder.mutation({
      query: (data) => ({
        url: '/customer/shipping/create',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { shipping: { shipping_fee: string } }) => {
        console.log(response)
        return response.shipping.shipping_fee
      },
      invalidatesTags: ['Shipping'],
    }),
  }),
})

export const { useCreateShippingMutation } = buyerApi
