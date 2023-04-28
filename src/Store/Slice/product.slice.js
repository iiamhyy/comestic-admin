import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";

const initialState = {
    items: [
          
        {
            id: 0,
            name: "",
            description: "",
            image: [],
            price: "",
            quantity: "",
            discount: "",
            brand: "",
        },
    ],
};

const productSlices = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
          
          state.items.push(action.payload)
        },
        setProduct: (state, action) => {
          state.items = action.payload;
        }
    },
});

const productReducer = productSlices.reducer;

export const productSelector = (state) => state.productReducer.allProducts;

export const { addProduct, setProduct } = productSlices.actions;

export default productReducer;
