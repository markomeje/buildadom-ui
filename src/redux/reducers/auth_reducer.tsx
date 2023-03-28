import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// auth service build

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
  }),
  endpoints: (builder) => ({
    adduser: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
    verifyNumber: builder.mutation({
      query: (data) => ({
        url: '/verification/verify',
        method: 'POST',
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useAdduserMutation,
  useVerifyNumberMutation,
  useUserLoginMutation,
} = authApi
