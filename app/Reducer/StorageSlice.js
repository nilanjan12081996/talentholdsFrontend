import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getStorageInfo = createAsyncThunk(
    'getStorageInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/storage/left');
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

const initialState = {
    loading: false,
    error: false,
    storageInfo: null,
};

const StorageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStorageInfo.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getStorageInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.storageInfo = payload?.data || null;
                state.error = false;
            })
            .addCase(getStorageInfo.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export default StorageSlice.reducer;
