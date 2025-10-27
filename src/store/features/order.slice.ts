import type { Orders } from '@/types/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    pendingOrders: Orders[]| null;
    acceptedOrders: Orders[] | null;
}

const initialState: OrderState = {
    pendingOrders: null,
    acceptedOrders: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPendingOrders: (state, action: PayloadAction<Orders[] | null>) => {
        state.pendingOrders = action.payload;
    },
    setAcceptedOrders: (state, action: PayloadAction<Orders[] | null>) => {
        state.acceptedOrders = action.payload;
    },
    addAcceptedOrders: (state, action: PayloadAction<Orders>) => {
        if (state.acceptedOrders) {
            state.acceptedOrders.unshift(action.payload);
        } else {
            state.acceptedOrders = [action.payload];
        }
    },
    addPendingOrders: (state, action: PayloadAction<Orders>) => {
        if (state.pendingOrders) {
            state.pendingOrders.unshift(action.payload);
        } else {
            state.pendingOrders = [action.payload];
        }
    },
    removePendingOrder: (state, action: PayloadAction<string>) => {
        if (state.pendingOrders) {
            state.pendingOrders = state.pendingOrders.filter(order => order._id !== action.payload);
        }
    },
    removeAcceptedOrder: (state, action: PayloadAction<string>) => {
        if (state.acceptedOrders) {
            state.acceptedOrders = state.acceptedOrders.filter(order => order._id !== action.payload);
        }
    }
  },
});

export const { setPendingOrders , setAcceptedOrders , addPendingOrders , addAcceptedOrders , removeAcceptedOrder , removePendingOrder} = orderSlice.actions;
export default orderSlice.reducer;
