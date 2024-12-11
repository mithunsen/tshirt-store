import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

type CartItemWithoutQuantity = Omit<CartItem, "quantity">;

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemWithoutQuantity>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
        } else {
          alert("Stock limit reached!");
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseItemQuantity(
      state,
      action: PayloadAction<CartItemWithoutQuantity>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      } else {
        alert("Could not find the item!");
      }
    },
    /* removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }, */
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
