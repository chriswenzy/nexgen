import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import userSlice from "../slices/user/userSlice";
import dataSlice from "../slices/data/dataSlice";
import configSlice from "../slices/config/configSlice";
import productSlice from "../slices/products/productsSlice";
import InvestmentSlice from "../slices/investment/investmentSlice";
import orderSlice from "../slices/order/orderSlice";
import CartSlice from "../slices/cart/cartSlice";

const isBrowser = typeof window !== "undefined";

const initialLoadingState = isBrowser
  ? sessionStorage.getItem("loading") === "true"
  : false;

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    data: dataSlice,
    config: configSlice,
    product: productSlice,
    investment: InvestmentSlice,
    orders: orderSlice,
    cart: CartSlice,

    loading: (state = initialLoadingState, action) => {
      if (isBrowser) {
        if (action.type.endsWith("/pending")) {
          sessionStorage.setItem("loading", "true");
          return true;
        } else if (
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")
        ) {
          // Remove loading state from sessionStorage
          sessionStorage.removeItem("loading");
          return false;
        }
      }
      return state;
    },
  },
});

export default store;
