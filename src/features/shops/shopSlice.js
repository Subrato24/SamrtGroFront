import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk to fetch shops
export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
  const response = await api.get('/api/shops');
  return response.data;
});

// Async thunk to add shop
export const addShop = createAsyncThunk('shops/addShop', async (newShop) => {
  const response = await api.post('/api/shops', newShop);
  return response.data; // The created shop from backend
});

const shopSlice = createSlice({
  name: 'shops',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchShops
      .addCase(fetchShops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // addShop
      .addCase(addShop.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default shopSlice.reducer;
