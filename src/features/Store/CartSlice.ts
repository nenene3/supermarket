import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from "../Products/productForm";

export interface Cart{
    products:ProductType[],
}

const initialState:Cart ={
    products:[]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      addProdut: (state, action: PayloadAction<ProductType>) => {
        state.products.push(action.payload)
      },
      removeProduct: (state, action) => {
        const index = action.payload; 
        if (index >= 0 && index < state.products.length) {
          state.products.splice(index, 1); 
        }
      },
      reset:(state)=>{
        return initialState
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {addProdut,removeProduct,reset } = counterSlice.actions
  
  export default counterSlice.reducer