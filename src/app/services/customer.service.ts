import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CORE_API_URL + '/customers'
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/registration',
        body: data
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/login',
        body: data
      })
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = customerApi