/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store'

export const validationApi = createApi({
  reducerPath: 'IdValidation',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).authToken.loggedUser
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user}`)
      }
      return headers
    },
    headers: { accept: 'application/json' },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
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
