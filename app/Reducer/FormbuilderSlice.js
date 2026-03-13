import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const formListData = createAsyncThunk(
    'auth/formList',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.get('/form/type-list', userInput);
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
export const createForm=createAsyncThunk(
    'createForm',
      async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/form/add/update', userInput);
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

export const getForm=createAsyncThunk(
    'getForm',
     async (slug, { rejectWithValue }) => {

        try {
            const response = await api.get(`/form/slug?slug=${slug}`, );
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
formTypeData:[],
error:false,
createFormData:"",
currentForm:null
}
const FormbuilderSlice=createSlice(
    {
        name:'formBuilder',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(formListData.pending,(state)=>{
            state.loading=true
        })
        .addCase(formListData.fulfilled,(state,{payload})=>{
            console.log("payload",payload);
            
            state.loading=false
            state.formTypeData=payload?.data
            state.error=false

        })
        .addCase(formListData.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
           .addCase(createForm.pending,(state)=>{
            state.loading=true
        })
        .addCase(createForm.fulfilled,(state,{payload})=>{
            state.loading=false
            state.createFormData=payload
            state.error=false

        })
        .addCase(createForm.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
            .addCase(getForm.pending,(state)=>{
            state.loading=true
        })
        .addCase(getForm.fulfilled,(state,{payload})=>{
            state.loading=false
            state.currentForm=payload?.data
            state.error=false

        })
        .addCase(getForm.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
        }
        
    }
)
export default FormbuilderSlice.reducer;
