/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  City,
  Country,
  ICategory,
  IProduct,
} from '@/interface/general.interface'
import { IStore } from '@/interface/store.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

// auth service build

export const storeApi = createApi({
  reducerPath: 'storeApi',
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
  tagTypes: ['Product', 'Store', 'OneProduct'],
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
    getProductsCategories: builder.query<
      { value: string; label: string }[],
      void
    >({
      query: () => ({ url: '/products/categories' }),
      transformResponse: (response: { categories: ICategory[] }, meta, arg) =>
        response.categories.map((category) => {
          return {
            value: category.id.toString(),
            label: category.name,
          }
        }),
    }),
    getMerchatProducts: builder.query<{ [k: string]: IProduct[] }[], void>({
      query: () => ({ url: '/marchant/products' }),
      transformResponse: (response: {
        products: { [k: string]: IProduct[] }[]
      }) => {
        return response.products
      },
      providesTags: ['Product'],
    }),

    merchantStoreDetails: builder.query<IStore, void>({
      query: () => ({ url: '/marchant/store' }),
      transformResponse: (response: { store: IStore }, meta, arg) => {
        return response.store
      },
      providesTags: ['Store'],
    }),

    getOneMerchantProduct: builder.query<IProduct, string>({
      query: (id) => ({ url: `/marchant/product/${id}` }),
      transformResponse: (response: { product: IProduct }) => {
        return response.product
      },
      providesTags: ['OneProduct'],
    }),

    // MUTATION
    imageUpload: builder.mutation({
      query: (data) => ({
        url: '/marchant/image/upload',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product', 'Store'],
    }),

    createStore: builder.mutation({
      query: (data) => ({
        url: 'marchant/store/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Store'],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: 'marchant/product/create',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { product: IProduct }, meta, arg) => {
        return response.product
      },
      invalidatesTags: ['Product'],
    }),

    publishStore: builder.mutation<
      string,
      { id: number | undefined; value: boolean }
    >({
      query: ({ id, value }) => ({
        url: `marchant/store/publish/${id}`,
        method: 'POST',
        body: { published: value },
      }),
      transformResponse: (response: { message: string }, meta, arg) => {
        return response.message
      },
      transformErrorResponse: (
        response: { status: number; data: { message: string } },
        meta,
        arg
      ) => {
        return response.data.message
      },
      invalidatesTags: ['Store'],
    }),

    publishProduct: builder.mutation<
      string,
      { id: number | undefined; value: boolean }
    >({
      query: ({ id, value }) => ({
        url: `marchant/product/publish/${id}`,
        method: 'POST',
        body: { published: value },
      }),
      transformResponse: (response: { message: string }) => {
        return response.message
      },
      transformErrorResponse: (
        response: { status: number; data: { message: string } },
        meta,
        arg
      ) => {
        return response.data.message
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'OneProduct', id: arg.id },
      ],
    }),

    // updateProduct: builder.mutation<any, any>({
    //   query: (data: any, id: any) => ({
    //     url: `/marchant/product/update/${id}`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    //   transformResponse: (response: { product: IProduct }, meta, arg) => {
    //     return response.product
    //   },
    //   invalidatesTags: ['Product'],
    // }),
  }),
})

export const {
  useGetMerchatProductsQuery,
  useGetCountriesQuery,
  useAddProductMutation,
  useGetProductsCategoriesQuery,
  useGetCitiesQuery,
  usePublishProductMutation,
  usePublishStoreMutation,
  useGetOneMerchantProductQuery,
  // useUpdateProductMutation,
  useCreateStoreMutation,
  useMerchantStoreDetailsQuery,
} = storeApi
