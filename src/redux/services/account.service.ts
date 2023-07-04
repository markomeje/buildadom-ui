/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { INewData } from '@/modals/AddDriver'

export const accountApi = createApi({
  reducerPath: 'accountApi',
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
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAccountInfo: builder.query<any, void>({
      query: () => ({
        url: '/marchant/account/information',
      }),
      transformResponse: (response: { account: any }) => {
        return response.account
      },
      providesTags: ['Account'],
    }),

    getBanks: builder.query<any, void>({
      query: () => ({
        url: '/banks',
      }),
      transformResponse: (response: { name: string }[]) => {
        console.log(response, 'responsess')
        const result = response.map((bank) => {
          return {
            value: bank.name,
            label: bank.name,
          }
        })
        return result
      },
    }),

    addAccountDetails: builder.mutation<string, any>({
      query: (data) => ({
        url: '/marchant/account/save',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        return response.message
      },
      invalidatesTags: ['Account'],
    }),

    updateDriver: builder.mutation<any, { id: number; data: INewData }>({
      query: ({ id, data }) => ({
        url: `marchant/driver/update/${id}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        console.log(response, 'rrrrrrssss')
        return response.message
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Account', id: arg.id },
      ],
    }),

    deleteDriver: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `marchant/driver/delete/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        return response.message
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Account', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetBanksQuery,
  useAddAccountDetailsMutation,
  useUpdateDriverMutation,
  useGetAccountInfoQuery,
  useDeleteDriverMutation,
} = accountApi
