import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../app/services/products.service";

export interface CartItem {
  product: Product;
  quantity: number;
}

const initialState = {
  items: [] as CartItem[],
  orderSend: false,
  isPlacing: false,
};

interface Order {
  products: {
    productId: string;
    quantity: number;
  }[];
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

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as any;
    const order: Order = {
      customer: state.auth.user as any,
      products: state.cart.items.map((item: any) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };
    const response = await axios.post(
      `${process.env.REACT_APP_CORE_API_URL}/order`,
      order,
      { headers: { Authorization: `Bearer ${state.auth.token}` } }
    );

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    seenMsg: (state) => {
      state.orderSend = false;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      let changed = false;
      state.items.forEach((item) => {
        if (item.product.id === action.payload.product.id) {
          item.quantity += 1;
          changed = true;
        }
      });

      if (!changed) {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(placeOrder.fulfilled, (state) => {
        state.orderSend = true;
        state.isPlacing = false;
        state.items = [];
      })
      .addCase(placeOrder.pending, (state) => {
        state.orderSend = false;
        state.isPlacing = true;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderSend = false;
        state.isPlacing = false;
      }),
});

export const { seenMsg, addToCart, updateQuantity } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;
