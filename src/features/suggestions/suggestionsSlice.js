import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';


export const fetchSuggestions = createAsyncThunk('suggestions/fetch', async () => {
const res = await api.get('/api/suggestions/mine');
return res.data;
});


const slice = createSlice({ name: 'suggestions', initialState: { items: [], status: 'idle' }, reducers: {}, extraReducers: (b) => {
b.addCase(fetchSuggestions.fulfilled, (s, a) => { s.items = a.payload; s.status = 'succeeded'; });
}});


export default slice.reducer;