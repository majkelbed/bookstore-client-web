import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./products.service";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BaseOrder {
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface GuestOrder extends BaseOrder {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
      firstLine: string;
      secondLine: string;
      city: string;
      postalCode: string;
    };
  };
}

export interface VeryfiedOrder extends BaseOrder {
  customerId: string;
}

export type CreateOrderDto = VeryfiedOrder | GuestOrder;

export interface Order {
  orderDetails: {
    price: 55.56999969482422
    productId: "544abd6b-f795-4876-abad-d1f23cb6d43c"
    productName: "Papugi faliste"
    quantity: 1
  }[];
  orderId: "3ac8589d-e7f3-4676-8e9b-20f3703184f9";
  packedAt: null;
  receivedAt: "2021-12-12T16:21:04.316371Z";
  sentAt: null;
  status: "RECEIVED";
}

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PRODUCT_API_URL + "/order",
  }),
  endpoints: (builder) => ({
    listOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: any) => response.orders,
      providesTags: ["orders"],
    }),
    placeOrder: builder.mutation<{}, CreateOrderDto>({
      query: (body) => {
        return {
          url: "/",
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: () => ["orders"],
    }),
  }),
});

export const { useListOrdersQuery, usePlaceOrderMutation } = ordersApi;
