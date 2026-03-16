import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
import axios from "axios";

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

export const saveForm=createAsyncThunk(
    'saveForm',
     async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post(`/fromsubmission/save`, userInput);
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


// Add to FormbuilderSlice.js

// export const uploadImageForm = createAsyncThunk(
//     'uploadImageForm',
//     async ({ file, submissionId, fieldId }, { rejectWithValue }) => {
//         try {
//             // Construct multipart/form-data
//             const formData = new FormData();
//             formData.append('file', file);
            
//             const response = await api.post(
//                 `/fromsubmission/upload/image?submissionId=${submissionId}&fieldId=${fieldId}`, 
//                 formData,
//                 // { headers: { 'Content-Type': 'multipart/form-data' } }
//             );
            
//             if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response.data);
//             }
//         } catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// );


export const uploadImageForm = createAsyncThunk(
    'uploadImageForm',
    async ({ file, submissionId, fieldId,email,formId }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            // Use STANDARD axios, NOT your custom 'api'
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/fromsubmission/upload/image?submissionId=${submissionId}&fieldId=${fieldId}&email=${email}&formId=${formId}`, 
                formData
                // Absolutely NO headers here! 
                // Axios + the browser will perfectly handle the multipart boundary.
            );
            
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const uploadVideoForm = createAsyncThunk(
    'uploadVideoForm',
    async ({ file, fileName, submissionId, fieldId, email, formId }, { rejectWithValue }) => {
        try {
            // Post raw binary file directly in the body
            const response = await api.post(
                `/fromsubmission/upload/video?fileName=${fileName}&submissionId=${submissionId}&fieldId=${fieldId}&email=${email}&formId=${formId}`,
                file,
                { headers: { 'Content-Type': file.type || 'application/octet-stream' } }
            );
            
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const initialState={
loading:false,
formTypeData:[],
error:false,
createFormData:"",
currentForm:null,
formsubmitData:"",
fileuploadData:"",
videoUploadData:""
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
            .addCase(saveForm.pending,(state)=>{
            state.loading=true
        })
        .addCase(saveForm.fulfilled,(state,{payload})=>{
            state.loading=false
            state.formsubmitData=payload
            state.error=false

        })
        .addCase(saveForm.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
           .addCase(uploadImageForm.pending,(state)=>{
            state.loading=true
        })
        .addCase(uploadImageForm.fulfilled,(state,{payload})=>{
            state.loading=false
            state.fileuploadData=payload
            state.error=false

        })
        .addCase(uploadImageForm.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })
                .addCase(uploadVideoForm.pending,(state)=>{
            state.loading=true
        })
        .addCase(uploadVideoForm.fulfilled,(state,{payload})=>{
            state.loading=false
            state.videoUploadData=payload
            state.error=false

        })
        .addCase(uploadVideoForm.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload
        })


        }
        
    }
)
export default FormbuilderSlice.reducer;
