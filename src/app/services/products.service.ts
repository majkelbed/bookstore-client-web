import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import faker from "faker";

const products = Array.from({ length: 30 }).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  images: [
    faker.image.animals(),
    faker.image.city(),
    faker.image.sports()
  ],
  price: faker.commerce.price(),
}));

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja' }),
  endpoints: (builder) => ({
    listProducts: builder.query<typeof products, void>({
    // mocking api for testing
      query: () => '/fact',
      transformResponse: () => products
    }),
    getProduct: builder.query<typeof products[0], string>({
      // mocking api for testing
        query: (id) => '/fact',
        transformResponse: () => products[0]
      }),
  }),
})

export const { useGetProductQuery, useListProductsQuery } = productsApi