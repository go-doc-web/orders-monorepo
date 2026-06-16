import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    // add слайсы (orders, products)
    reducer: {},
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
