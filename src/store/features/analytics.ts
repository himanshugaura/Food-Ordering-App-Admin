import type { Orders, Stats } from "@/types/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AnalyticState {
  stats: Stats | null;
  orders: Orders[] | null;
}

const initialState: AnalyticState = {
  stats: null,
  orders: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers:  {
    setStats(state, action: PayloadAction<Stats | null>) {
      state.stats = action.payload;
    },
    setOrders(state, action: PayloadAction<Orders[] | null>) {
      state.orders = action.payload;
    },
  },
});

export const { setStats , setOrders } =
  analyticsSlice.actions;
export default analyticsSlice.reducer;
