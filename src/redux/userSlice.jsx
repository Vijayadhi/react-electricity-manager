import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const APIURL = 'https://electricity-manager-api.onrender.com'
export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.get(`${APIURL}/users/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return res.data;  // Return the user data
        } catch (error) {
            return rejectWithValue('Error fetching user data');
        }
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        userData: [],
        isAuthenticated: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        checkAuth: (state) => {
            const token = localStorage.getItem('authToken');
            state.isAuthenticated = !!token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Export actions and reducer
export const { checkAuth } = userSlice.actions;
export default userSlice.reducer;