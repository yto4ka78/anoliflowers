import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, size } = action.payload;
      const item = state.find((i) => i.id === id && i.size === size);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      Cookies.set("cart", JSON.stringify(state), { expires: 1 });
    },
    removeFromCart(state, action) {
      const newState = state.filter((i) => i.id !== action.payload);
      Cookies.set("cart", JSON.stringify(newState), { expires: 1 });
      return newState;
    },
    clearCart() {
      Cookies.remove("cart", { path: "/" });
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
