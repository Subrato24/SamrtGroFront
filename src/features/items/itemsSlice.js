import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk to fetch items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await api.get('/api/items');
    return response.data;
});

// Async thunk to add item
export const addItem = createAsyncThunk(
    'items/addItem',
    async (newItem) => {
        const response = await api.post('/api/items', newItem);
        return response.data; // The created item from backend
    }
);

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, item }) => {
  const res = await api.put(`/api/items/update/${id}`, item);
  return res.data;
});


const itemSlice = createSlice({
    name: 'items',
    initialState: { list: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // addItem
            .addCase(addItem.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const updated = action.payload;
                // Use .map to create new array reference so React re-renders
                state.list = state.list.map((i) => (i.id === updated.id ? updated : i));
            });
    },
});

export default itemSlice.reducer;
