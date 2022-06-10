import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addFoodToCart: (state, action) => {
      const addedItem = state.cart.find((i) => i.id === action.payload.id);

      if (addedItem) {
        state.cart = state.cart.map((i) => {
          if (i.id === action.payload.id) {
            i.quantity++;
          }
          return i;
        });
        return;
      }

      state.cart.push({ ...action.payload, quantity: 1 });
    },
    removeItem: (state, action) => {
      // const currentItem = state.cart.find((i) => i.id === action.payload.id);
      state.cart = state.cart.filter((i) => i.id !== action.payload.id);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addFoodToCart, clearCart, removeItem } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
