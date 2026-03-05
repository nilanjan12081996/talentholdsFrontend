import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const partnerWithUs = createAsyncThunk(
    'partnerWithUs',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact-us/request-partner', userInput);
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

export const getCountry = createAsyncThunk(
    'getCountry',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.get('/country/countries', userInput);
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
    partnerWithUsData:"",
    countryList:[]

}
const PartnerSlice=createSlice(
    {
        name:'partner',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(partnerWithUs.pending,(state)=>{
                state.loading=true
            })
            .addCase(partnerWithUs.fulfilled,(state,{payload})=>{
                state.loading=false
                state.partnerWithUsData=payload
                state.error=false
            })
            .addCase(partnerWithUs.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getCountry.pending,(state)=>{
                state.loading=true
            })
            .addCase(getCountry.fulfilled,(state,{payload})=>{
                state.loading=false
                state.countryList=payload
                state.error=false
            })
            .addCase(getCountry.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default PartnerSlice.reducer;