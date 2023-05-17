/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const driverApi = createApi({
  reducerPath: 'driversApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).authToken.loggedUser
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user}`)
      }
      return headers
    },
  }),
  tagTypes: ['Drivers'],
  endpoints: (builder) => ({
    getDriver: builder.query<any, void>({
      query: () => ({
        url: 'marchant/drivers',
      }),
      transformResponse: (response: {
        drivers: { firstname: string; lastname: string; phone: string }[]
      }) => {
        console.log(response, 'rawwww')
        return response.drivers
      },
      providesTags: ['Drivers'],
    }),

    addDriver: builder.mutation<string, any>({
      query: (data) => ({
        url: 'marchant/driver/add',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        return response.message
      },
      invalidatesTags: ['Drivers'],
    }),
  }),
})

export const { useAddDriverMutation, useGetDriverQuery } = driverApi
