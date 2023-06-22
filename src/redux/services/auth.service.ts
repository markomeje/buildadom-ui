/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
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
      transformResponse: (
        response: { response: { user: { token: string } } },
        meta,
        arg
      ) => response.response.user.token,
    }),
    resendVerificationCode: builder.mutation({
      query: (data) => ({
        url: '/verification/code/resend',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response)
        return response
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response)
        return response
      },
    }),
    customerSignUp: builder.mutation({
      query: (data) => ({
        url: '/customer/signup',
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
  useCustomerSignUpMutation,
} = authApi
