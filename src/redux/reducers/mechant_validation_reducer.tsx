/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const validationApi = createApi({
  reducerPath: 'IdValidation',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    prepareHeaders: (headers, { getState, endpoint }) => {
      // const user = (getState() as RootState).authToken.token
      const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')

      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user?.token}`)
      }
      return headers
    },
    headers: { accept: 'application/json' },
  }),
  endpoints: (builder) => ({
    addValidation: builder.mutation({
      query: (data) => ({
        url: '/marchant/identification/save',
        method: 'POST',
        body: data,
      }),
    }),

    imageUpload: builder.mutation({
      query: (data) => ({
        url: '/marchant/image/upload',
        method: 'POST',
        body: data,
      }),
    }),

    getValidationDetails: builder.query<any, void>({
      query: () => ({
        url: '/marchant/identification/details',
        method: 'GET',
      }),
      transformResponse: (response: any, meta, arg) => {
        return response.details
      },
    }),
  }),
})

export const {
  useAddValidationMutation,
  useGetValidationDetailsQuery,
  useImageUploadMutation,
} = validationApi
