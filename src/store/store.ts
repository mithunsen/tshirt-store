import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/slices/productsSlice";
import cartReducer from "../store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
