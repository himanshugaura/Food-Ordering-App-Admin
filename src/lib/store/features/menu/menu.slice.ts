import { Category, Product } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  categories: Category[] | null;
  products: Product[] | null;
}

const initialState: MenuState = {
  categories: null,
  products: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // CATEGORY REDUCERS
    setCategory(state, action: PayloadAction<Category[] | null>) {
      state.categories = action.payload;
    },
    removeCategory(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      if (state.categories) {
        state.categories = state.categories.filter(cat => cat.id !== idToRemove);
      }
    },

    // PRODUCT REDUCERS
    setProduct(state, action: PayloadAction<Product[] | null>) {
      state.products = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      if (state.products) {
        state.products = state.products.filter(prod => prod.id !== idToRemove);
      }
    },
  },
});

export const { setCategory, removeCategory, setProduct, removeProduct } = menuSlice.actions;
export default menuSlice.reducer;
