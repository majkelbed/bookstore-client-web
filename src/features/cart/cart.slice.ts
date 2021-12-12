import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../app/services/products.service";

export interface CartItem {
  product: Product;
  quantity: number;
}

const initialState = {
  items: [] as CartItem[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      let changed = false;
      state.items.forEach(item => {
        if(item.product.id === action.payload.product.id) {
          item.quantity += 1;
          changed = true;
        }
      });
      
      if(!changed) {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(item => item.product.id === action.payload.product.id);
      if(index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    }
  }
})

export const { addToCart, updateQuantity } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;