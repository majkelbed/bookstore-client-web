import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  reviews: {
    id: string;
    text: string;
    stars: number;
  }[]
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ['single-product'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCT_API_URL + "/product",
  }),
  endpoints: (builder) => ({
    listProducts: builder.query<Product[], void>({
      query: () => "/"
    }),
    getProduct: builder.query<Product, string>({
      query: (id: string) => `/${id}`,
      providesTags: () => ['single-product']
    }),
    createReview: builder.mutation<{}, { text: string, productId: string, stars: number }>({
      query: (body) => {
        body.stars = Math.min(5, Math.max(0, body.stars));

        return ({
          url: '/review',
          method: 'POST',
          body
        })
      },
      invalidatesTags: () => ['single-product']
    })
  }),
});

export const { useGetProductQuery, useListProductsQuery, useCreateReviewMutation } = productsApi;
