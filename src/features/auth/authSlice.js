import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// JWT login example
export const loginJwt = createAsyncThunk(
    'auth/loginJwt',
    async ({ email, passwordHash }, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/api/users/login', {
                email,
                passwordHash
            })

            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, passwordHash }, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/api/users', {
                name, email, passwordHash
            })
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.status = 'idle'
            state.error = null
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginJwt.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginJwt.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.token = action.payload.token || null;

                localStorage.setItem("user", JSON.stringify(action.payload));
                // localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginJwt.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

        builder
            .addCase(registerUser.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
