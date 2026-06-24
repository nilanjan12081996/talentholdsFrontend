import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getPlans = createAsyncThunk(
    'getPlans',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.get('/plan', userInput);
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
    plans: []
};

const PlanSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlans.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPlans.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.plans = payload;
                state.error = false;
            })
            .addCase(getPlans.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export default PlanSlice.reducer;
