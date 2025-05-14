"use client";

import store from "@/store/store";
import Loading from "@/util/loading";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ToastContainer hideProgressBar />
      <Loading />
      {children}
    </Provider>
  );
}
