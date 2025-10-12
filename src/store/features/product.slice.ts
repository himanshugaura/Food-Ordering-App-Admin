import type { Product } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[] | null;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: null,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[] | null>) {
      state.products = action.payload;
    },
    removeProduct(state , action: PayloadAction<string>) {
        if(state.products) {    
            state.products = state.products.filter(product => product._id !== action.payload);
        }
    },
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      if(state.products) {
        state.products.unshift(action.payload);
      } else {
        state.products = [action.payload];
      }
  }  
  },
});

export const { setProducts , removeProduct , setSelectedProduct  , addProduct} = productSlice.actions;
export default productSlice.reducer;
