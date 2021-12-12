import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCT_API_URL + "/product",
  }),
  endpoints: (builder) => ({
    listProducts: builder.query<Product[], void>({
      query: () => "/"
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/${id}`
    }),
  }),
});

export const { useGetProductQuery, useListProductsQuery } = productsApi;
