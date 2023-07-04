/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { INewData } from '@/modals/AddDriver'

export const driverApi = createApi({
  reducerPath: 'driversApi',
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
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }: { id: any }) => ({
                type: 'Drivers' as const,
                id,
              })),
              'Drivers',
            ]
          : ['Drivers'],
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

    updateDriver: builder.mutation<any, { id: number; data: INewData }>({
      query: ({ id, data }) => ({
        url: `marchant/driver/update/${id}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        return response.message
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Drivers', id: arg.id },
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
        { type: 'Drivers', id: arg.id },
      ],
    }),
  }),
})

export const {
  useAddDriverMutation,
  useUpdateDriverMutation,
  useGetDriverQuery,
  useDeleteDriverMutation,
} = driverApi
