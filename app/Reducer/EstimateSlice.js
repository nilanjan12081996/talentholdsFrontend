import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
export const getEstimate = createAsyncThunk(
    'getEstimate',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact-us/request-estimate', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const initialState={
    loading:false,
    error:false,
    getEstimateData:""
}
const EstimateSlice=createSlice({
    name:"estimate",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getEstimate.pending,(state)=>{
            state.loading=true
        })
        .addCase(getEstimate.fulfilled,(state,{payload})=>{
            state.loading=false
            state.getEstimateData=payload
            state.error=false
        })
        .addCase(getEstimate.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
})
export default EstimateSlice.reducer