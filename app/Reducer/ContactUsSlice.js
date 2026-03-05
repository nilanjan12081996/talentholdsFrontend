import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const contactUs = createAsyncThunk(
    'contactUs',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact-us/request-contact-us', userInput);
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
    contactUsData:""
}
const ContactUsSlice=createSlice(
{
    name:"contact",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(contactUs.pending,(state)=>{
            state.loading=true
        })
        .addCase(contactUs.fulfilled,(state,{payload})=>{
            state.loading=false
            state.contactUsData=payload
            state.error=false
        })
        .addCase(contactUs.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
}
)
export default ContactUsSlice.reducer;