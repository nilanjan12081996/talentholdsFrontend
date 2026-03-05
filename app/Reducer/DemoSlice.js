import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
export const demoRequest = createAsyncThunk(
    'demoRequest',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact-us/request-demo', userInput);
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
    demoRequestData:""

}
const DemoSlice=createSlice({
name:"demo",
initialState,
reducers:{},
extraReducers:(builder)=>{
    builder.addCase(demoRequest.pending,(state)=>{
        state.loading=true
    })
    .addCase(demoRequest.fulfilled,(state,{payload})=>{
        state.loading=false
        state.demoRequestData=payload
        state.error=false
    })
    .addCase(demoRequest.rejected,(state,{payload})=>{
        state.loading=false
        state.error=payload
    })
}
})
export default DemoSlice.reducer;