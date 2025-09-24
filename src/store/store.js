import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemsSlice';
import authReducer from '../features/auth/authSlice';
import shopReducer from '../features/shops/shopSlice';
import shoppingReducer from '../features/shopping/shoppingSlice'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    auth: authReducer,
    shops: shopReducer,
    shopping: shoppingReducer,
  },
});
