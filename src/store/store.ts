import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth.slice';
import productReducer from './features/product.slice';
import categroyReducer from './features/category';
import storeReducer from './features/store.slice';
import orderReducer from './features/order.slice';
import analyticsReducer from './features/analytics';

export const store = configureStore({
  reducer: {
    auth : userReducer,
    product: productReducer,
    category: categroyReducer,
    store: storeReducer,
    order: orderReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;