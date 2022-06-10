import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import UserReducer from "../features/user/userSlice";

const reducers = combineReducers({
  cart: CartReducer,
  user: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
