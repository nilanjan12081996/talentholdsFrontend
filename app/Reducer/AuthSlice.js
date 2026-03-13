import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const login = createAsyncThunk(
    'auth/login',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/organization/login', userInput);
            if (response?.data?.statusCode === 200) {
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
export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/organization/verfy/otp', userInput);
            if (response?.data?.statusCode === 200) {
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


export const registration = createAsyncThunk(
    'auth/registration',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/organization/register', userInput);
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

export const workspaceList = createAsyncThunk(
    'auth/workspaceList',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.get('/workspace', userInput);
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

export const createWorkspace = createAsyncThunk(
    'auth/createWorkspace',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/workspace/create', userInput);
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
const initialState = {
    message: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    currentUser: {},
    subdomain: [],
    loadingLogin: false,
    otpData:"",
    registerData:"",
    workspaceData:[],
    createWorkspaceData:""
}
const AuthSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {

            clearCurrentUser: (state) => {
                state.currentUser = {};
            },
            resetAfterLoggedIn: (state) => {
                state = { ...initialState, isLoggedIn: true };
            },

            logout: (state) => {
                state.isLoggedIn = false;
                state.currentUser = {};
                state.message = null;
                state.error = null
                sessionStorage.removeItem('talent_hold_token')
               
                localStorage.clear()
                sessionStorage.clear()

            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                    state.loadingLogin = true;
                    state.isLoggedIn = false;
                    state.error = false;
                })
                .addCase(login.fulfilled, (state, { payload }) => {

                    console.log("Payload", payload);
                    state.isLoggedIn = true;

                    state.message = payload?.message;
                    state.loadingLogin = false;

                    // sessionStorage.setItem(
                    //     'ai_interview_token',
                    //     JSON.stringify({ token: payload?.token })
                    // )
                    //  sessionStorage.setItem("role", payload?.role)
                })
                .addCase(login.rejected, (state, response) => {
                    
                    state.error = true;
                    state.loadingLogin = false;
                    state.message =
                        response !== undefined && response
                            ? response
                            : 'Something went wrong. Try again later.';
                })
                .addCase(verifyOtp.pending,(state)=>{
                    state.loading=true
                })
                // .addCase(verifyOtp.fulfilled,(state,{payload})=>{
                //     state.loading=false
                //     state.otpData=payload
                //     state.error=false
                //     console.log("payload",payload);
                    
                //     sessionStorage.setItem("talent_hold_token",JSON.stringify({token:payload?.token}))
                // })
                .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.otpData = payload;
                    state.error = false;

                    // Token is at root level of API response
                    const token = payload?.token;

                    console.log("Full payload:", payload);
                    console.log("Token extracted:", token);

                    if (token) {
                        sessionStorage.setItem("talent_hold_token", JSON.stringify({ token }));
                        state.isLoggedIn = true;  // ← also mark as logged in!
                    } else {
                        console.warn("No token found in verifyOtp response");
                    }
                })
                .addCase(verifyOtp.rejected,(state,{payload})=>{
                    state.loading=false
                    state.error=payload
                })
                   .addCase(registration.pending,(state)=>{
                    state.loading=true
                })
                .addCase(registration.fulfilled,(state,{payload})=>{
                    state.loading=false
                    state.registerData=payload
                    state.error=false
                    sessionStorage.setItem("talent_hold_token",JSON.stringify({token:payload?.token}))
                })
                .addCase(registration.rejected,(state,{payload})=>{
                    state.loading=false
                    state.error=payload
                })
                  .addCase(workspaceList.pending,(state)=>{
                    state.loading=true
                })
                .addCase(workspaceList.fulfilled,(state,{payload})=>{
                    state.loading=false
                    state.workspaceData=payload
                    state.error=false
                    
                })
                .addCase(workspaceList.rejected,(state,{payload})=>{
                    state.loading=false
                    state.error=payload
                })
                 .addCase(createWorkspace.pending,(state)=>{
                    state.loading=true
                })
                .addCase(createWorkspace.fulfilled,(state,{payload})=>{
                    state.loading=false
                    state.createWorkspaceData=payload
                    state.error=false
                    
                })
                .addCase(createWorkspace.rejected,(state,{payload})=>{
                    state.loading=false
                    state.error=payload
                })
                
                
        }
    }
)

export const { resetAfterLoggedIn, clearCurrentUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer