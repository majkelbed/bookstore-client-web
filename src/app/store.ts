import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "../features/auth/auth.slice";
import { customerApi } from "./services/customer.service";
import { productsApi } from "./services/products.service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware, productsApi.middleware),
});

export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
