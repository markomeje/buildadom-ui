/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import { IProduct } from '@/interface/general.interface'
import { getUserCookie } from '@/hooks/useCookie'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { accept: 'application/json' },
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = getUserCookie('user')
        ? JSON.parse(getUserCookie('user') as string)
        : ''
      console.log(user, 'logggg')
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user ? user.token : ''}`)
      }
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCartDetails: builder.query<any, void>({
      query: () => ({
        url: 'customer/cart/items',
      }),
      transformResponse: (response: { items: any[] }) => {
        console.log(response, 'cart')

        return { total: response.items.length, items: response.items }
      },

      transformErrorResponse: (response) => {
        console.log(response, 'cart error response')
      },
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: 'customer/cart/add',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => {
        console.log(response)
        return response
      },
      transformErrorResponse: (response) => {
        console.log(response, 'error response')
      },
      invalidatesTags: ['Cart'],
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `customer/cart/delete/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => {
        console.log(response)
        return response
      },
      transformErrorResponse: (response) => {
        console.log(response, 'error response')
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
    }),
  }),
})

export const {
  useAddToCartMutation,
  useGetCartDetailsQuery,
  useDeleteFromCartMutation,
} = cartApi
