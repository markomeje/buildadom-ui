/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { City, Country, ICategory } from '@/interface/general.interface'
import { IStore } from '@/interface/store.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

// auth service build

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.buildadom.net/api/v1',
    headers: { accept: 'application/json' },
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).authToken.loggedUser
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user}`)
      }
      return headers
    },
  }),
  tagTypes:['Product'],
  endpoints: (builder) => ({
    // QUERIES
    getCountries: builder.query<Country[], void>({
      query: () => ({ url: '/countries' }),
      transformResponse: (response: { countries: Country[] }, meta, arg) =>
        response.countries,
    }),
    getCities: builder.query<City[], string>({
      query: (country_code) => ({
        url: `/cities?contry_code=${country_code}`,
        keepUnusedDataFor: 0.0001,
      }),
      transformResponse: (response: { data: City[] }, meta, arg) =>
        response.data.map((city) => {
          return { id: city.id, name: city.name }
        }),
    }),
    getProductsCategories: builder.query<{value:string, label:string}[], void>({
      query: () => ({url:'/products/categories'}),
      transformResponse: (response: {categories: ICategory[]}, meta, arg) => response.categories.map(category => {
        return {
          value: category.id.toString(),
          label: category.name,
        }
      })
    }),
    merchantStoreDetails: builder.query<IStore, void>({
      query: () => ({ url: '/marchant/store' }),
      transformResponse: (response: { store: any }, meta, arg) => {
        return response.store
      },
    }),

    // MUTATION
    createStore: builder.mutation({
      query: (data) => ({
        url: 'marchant/store/create',
        method: 'POST',
        body: data,
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: 'marchant/product/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product']
    })

  }),
})

export const {
  useGetCountriesQuery,
  useAddProductMutation,
  useGetProductsCategoriesQuery,
  useGetCitiesQuery,
  useCreateStoreMutation,
  useMerchantStoreDetailsQuery,
} = storeApi