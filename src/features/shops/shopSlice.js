import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// ================= Async Thunks =================
export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
  const response = await api.get('/api/shops');
  return response.data;
});

export const addShop = createAsyncThunk('shops/addShop', async (shop) => {
  const response = await api.post('/api/shops', shop);
  return response.data;
});

export const updateShop = createAsyncThunk(
  'shops/updateShop',
  async ({ id, shop }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/shops/update/${id}`, shop);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// ================= Slice =================
const shopSlice = createSlice({
  name: 'shops',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchShops.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add
      .addCase(addShop.fulfilled, (state, action) => { state.list.push(action.payload); })

      // Update
      .addCase(updateShop.fulfilled, (state, action) => {
        const index = state.list.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
  },
});

export default shopSlice.reducer;
