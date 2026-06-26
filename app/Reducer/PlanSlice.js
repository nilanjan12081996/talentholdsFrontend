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
export const createSubscription = createAsyncThunk(
    'createSubscription',
    async (userInput, { rejectWithValue }) => {
        try {
            // userInput is { planId: 1 }
            const response = await api.post('/subscription/create', userInput);
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

export const verifyPayment = createAsyncThunk(
    'verifyPayment',
    async (userInput, { rejectWithValue }) => {
        try {
            // userInput is { razorpayPaymentId, razorpaySubscriptionId, razorpaySignature }
            const response = await api.post('/subscription/verify', userInput);
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

export const getCurrentSubscription = createAsyncThunk(
    'getCurrentSubscription',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/subscription/current');
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

export const getAllSubscriptions = createAsyncThunk(
    'getAllSubscriptions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/subscription');
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

export const cancelSubscription = createAsyncThunk(
    'cancelSubscription',
    async (subscriptionId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/subscription/${subscriptionId}/cancel`);
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
    plans: [],
    currentSubscription: null,
    allSubscriptions: [],
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
            })
            .addCase(getCurrentSubscription.fulfilled, (state, { payload }) => {
                // Backend returns an array for current subscription, e.g. data: [{...}]
                if (Array.isArray(payload?.data) && payload.data.length > 0) {
                    state.currentSubscription = payload.data[0];
                } else {
                    state.currentSubscription = payload?.data || null;
                }
            })
            .addCase(getAllSubscriptions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSubscriptions.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allSubscriptions = payload?.data || [];
            })
            .addCase(getAllSubscriptions.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export default PlanSlice.reducer;
