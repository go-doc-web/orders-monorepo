import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import productsSlice from "./productsSlice";

export const makeStore = () => {
  return configureStore({
    // add слайсы (orders, products)
    reducer: {
      orders: ordersReducer,
      products: productsSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
