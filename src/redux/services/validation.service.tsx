/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store'
import { AuthError } from '@/interface/errors'

export const validationApi = createApi({
  reducerPath: 'IdValidation',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.buildadom.net/api/v1',
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
      transformErrorResponse: (response: AuthError, meta, arg) => {
        if (response.data.errors) {
          return (
            Object.values(response.data.errors) &&
            Object.values(response.data.errors).join(',')
          )
        }
      },
    }),

    getValidationDetails: builder.query<any, void>({
      query: () => ({
        url: '/marchant/identification/details',
        method: 'GET',
      }),
      transformResponse: (response: any, meta, arg) => {
        console.log(response, 'verify')
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
