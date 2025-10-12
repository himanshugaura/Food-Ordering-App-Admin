import type { Category } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: Category[] | null;
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: null,
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[] | null>) {
      state.categories = action.payload;
    },
    removeCategory(state , action: PayloadAction<string>) {
        if(state.categories) {    
            state.categories = state.categories.filter(category => category._id !== action.payload);
        }
    },
    setSelectedCategory(state, action: PayloadAction<Category | null>) {
      state.selectedCategory = action.payload;
    },
    addCategory(state, action: PayloadAction<Category>) {
      if(state.categories) {
        state.categories.unshift(action.payload);
      } else {
        state.categories = [action.payload];
      } 
  },
}
});

export const { setCategories , removeCategory , setSelectedCategory , addCategory } = categorySlice.actions;
export default categorySlice.reducer;
