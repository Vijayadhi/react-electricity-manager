import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBuildings = createAsyncThunk(
    'buildings/fetchBuildings',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.get('https://electricity-manager-api.onrender.com/meter/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(res);            
            return res.data;
        } catch (error) {
            return rejectWithValue('Error fetching buildings');
        }
    }
);

export const postBuildingData = createAsyncThunk(
    'buildings/postBuildingData',
    async (newBuilding, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.post('https://electricity-manager-api.onrender.com/meter/', newBuilding, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue('Error posting building data');
        }
    }
);

export const updateBuildingData = createAsyncThunk(
    'buildings/updateBuildingData',
    async ({ id, updatedBuilding }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.put(`https://electricity-manager-api.onrender.com/meter/${id}/`, updatedBuilding, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue('All Fields should be UNIQUELY FILLED');
        }
    }
);

export const deleteBuildingData = createAsyncThunk(
    'buildings/deleteBuildingData',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.delete(`https://electricity-manager-api.onrender.com/meter/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            // Return the ID of the deleted building
            return { id }; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const buildingSlice = createSlice({
    name: 'buildings',
    initialState: {
        buildingData: [],
        isAuthenticated: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        authCheck: (state) => {
            const token = localStorage.getItem('authToken');
            state.isAuthenticated = !!token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuildings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBuildings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.buildingData = action.payload;
            })
            .addCase(fetchBuildings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(postBuildingData.fulfilled, (state, action) => {
                state.buildingData.push(action.payload);
            })
            .addCase(updateBuildingData.fulfilled, (state, action) => {
                const index = state.buildingData.findIndex(building => building.id === action.payload.id);
                if (index !== -1) {
                    state.buildingData[index] = action.payload;
                }
            })
            .addCase(deleteBuildingData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBuildingData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove the deleted building from the state
                state.buildingData = state.buildingData.filter(building => building.id !== action.payload.id);
            })
            .addCase(deleteBuildingData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { authCheck } = buildingSlice.actions;
export default buildingSlice.reducer;
