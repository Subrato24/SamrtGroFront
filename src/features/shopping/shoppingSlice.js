import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Add shopping item
export const addShoppingItem = createAsyncThunk(
  'shopping/addItem',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/shopping', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch shopping list
export const fetchShoppingList = createAsyncThunk(
  'shopping/fetchShoppingList',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/shopping/user/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update shopping item
export const updateShoppingItem = createAsyncThunk(
  'shopping/updateItem',
  async ({ id, quantity, price }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/shopping/update/${id}`, {
        quantity,
        price,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete shopping item
export const deleteShoppingItem = createAsyncThunk(
  'shopping/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/shopping/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch shopping dates and shops
export const fetchShoppingDates = createAsyncThunk(
  'shopping/fetchShoppingDates',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/shopping/summary/date/${userId}`);
      return response.data; // array of [date, total]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchShoppingShops = createAsyncThunk(
  'shopping/fetchShoppingShops',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/shopping/summary/shop/${userId}`);
      return response.data; // array of [shopName, total]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Save shopping summary
export const saveShoppingSummary = createAsyncThunk(
  'shopping/saveShoppingSummary',
  async (summary, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/shopping/summary/save', summary);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    list: [],
    dates: [],
    shops: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateShoppingItem.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteShoppingItem.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(fetchShoppingDates.fulfilled, (state, action) => {
        state.dates = action.payload.map((d) => d[0]);
      })
      .addCase(fetchShoppingShops.fulfilled, (state, action) => {
        state.shops = action.payload.map((s) => s[0]);
      });
  },
});

export default shoppingSlice.reducer;
