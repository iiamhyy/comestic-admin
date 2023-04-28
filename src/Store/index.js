import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/product.slice";

export const store = configureStore({
          reducer: {
                    products: productReducer,
          }
})