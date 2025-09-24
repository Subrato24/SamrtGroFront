import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('http://localhost:8080/api/items');
    return response.data;
});

// Async thunk to add item
export const addItem = createAsyncThunk(
    'items/addItem',
    async (newItem) => {
        const response = await axios.post('http://localhost:8080/api/items', newItem);
        return response.data; // The created item from backend
    }
);  


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
            });
    },
});

export default itemSlice.reducer;
