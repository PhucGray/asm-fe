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
            i.quantity += action.payload.quantity;
          }
          return i;
        });
        return;
      }

      state.cart.push({ ...action.payload });
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;

      state.cart = state.cart.map((i) => {
        if (i.id === id) {
          i.quantity++;
        }

        return i;
      });
    },
    descreaseQuantity: (state, action) => {
      const id = action.payload;

      state.cart = state.cart.map((i) => {
        if (i.id === id) {
          i.quantity--;
        }

        return i;
      });
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((i) => i.id !== id);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  addFoodToCart,
  clearCart,
  removeItem,
  increaseQuantity,
  descreaseQuantity,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
