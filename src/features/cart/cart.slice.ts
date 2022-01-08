import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../app/services/products.service";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

const getCartCache = () => {
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart) as Cart;
  }

  return null;
};

const setCartCache = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: Cart = getCartCache() ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

      setCartCache(state);
    },
    updateQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }

      setCartCache(state);
    },
    clearCart: (state) => {
      state.items = [];

      setCartCache(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    }
  },
});

export const { addToCart, updateQuantity, clearCart, removeItem } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;
