import type { Category } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: Category[] | null;
}

const initialState: CategoryState = {
  categories: null,
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
  },
});

export const { setCategories , removeCategory , } = categorySlice.actions;
export default categorySlice.reducer;
