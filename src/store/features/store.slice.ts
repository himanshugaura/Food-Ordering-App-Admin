import type { Store } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  store: Store | null;

}

const initialState: StoreState = {
  store: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore(state, action: PayloadAction<Store>) {
      state.store = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;
