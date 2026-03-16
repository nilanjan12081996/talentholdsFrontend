import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const getCandidateByWorkspace=createAsyncThunk(
    'getCandidateByWorkspace',
     async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post(`/candidate/workspace/candidate`,userInput);
            if (response?.data?.statusCode === 200||response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            // let errors = errorHandler(err);
            return rejectWithValue(err);
        }
    }
)


// export const getCandidateByWorkspace=createAsyncThunk(
//     'getCandidateByWorkspace',
//      async ({id}, { rejectWithValue }) => {

//         try {
//             const response = await api.get(`/candidate/workspace/get/workspace/candidate/${id}`);
//             if (response?.data?.statusCode === 200||response?.data?.statusCode === 201) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response.data);
//             }
//         } catch (err) {
//             // let errors = errorHandler(err);
//             return rejectWithValue(err);
//         }
//     }
// )

export const fisrtMessgaeSend=createAsyncThunk(
    'fisrtMessgaeSend',
     async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post(`/inbox/candidate/reply`,userInput);
            if (response?.data?.statusCode === 200||response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            // let errors = errorHandler(err);
            return rejectWithValue(err);
        }
    }
)

const initialState={
    loading:false,
    error:false,
    candidate:[],
    sendMessage:{}
}
const CandidateSlice=createSlice({
    name:"candidate",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCandidateByWorkspace.pending,(state)=>{
            state.loading=true
        })
        .addCase(getCandidateByWorkspace.fulfilled,(state,{payload})=>{
            state.loading=false
            state.candidate=payload
            state.error=false
        })
        .addCase(getCandidateByWorkspace.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
            .addCase(fisrtMessgaeSend.pending,(state)=>{
            state.loading=true
        })
        .addCase(fisrtMessgaeSend.fulfilled,(state,{payload})=>{
            state.loading=false
            state.sendMessage=payload
            state.error=false
        })
        .addCase(fisrtMessgaeSend.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
    }
})
export default CandidateSlice.reducer