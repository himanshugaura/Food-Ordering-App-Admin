import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth.slice';
import productReducer from './features/product.slice';

export const store = configureStore({
  reducer: {
    auth : userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;