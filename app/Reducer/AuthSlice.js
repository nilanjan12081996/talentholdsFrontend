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
            return rejectWithValue(err?.response?.data);
        }
    }
)
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/send-otp', userInput);
            if (response?.data?.statusCode === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/organization/resent/otp', userInput);
            if (response?.data?.statusCode === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
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
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data);
        }
    }
)

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/organization/profile');
            if (response?.data?.statusCode === 200 || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.put('/user/organization/profile', userInput);
            if (response?.data?.statusCode === 200 || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/organization/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response?.data?.statusCode === 200 || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/organization/forgetpassword', userInput);
            if (response?.data?.statusCode === 200 || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/organization/resetpassword', userInput);
            if (response?.data?.statusCode === 200 || response?.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
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
    otpData: "",
    registerData: "",
    profileData: null,
    updateProfileData: null,
    uploadAvatarData: null
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

                    const token = payload?.token || payload?.data?.token;
                    if (token) {
                        sessionStorage.setItem("talent_hold_token", JSON.stringify({ token }));
                    }
                })
                .addCase(login.rejected, (state, { payload }) => {
                    state.error = true;
                    state.loadingLogin = false;
                    state.message = payload ?? 'Something went wrong. Try again later.';
                })
                .addCase(sendOtp.pending, (state) => {
                    state.loading = true
                })
                .addCase(sendOtp.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                })
                .addCase(sendOtp.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(verifyOtp.pending, (state) => {
                    state.loading = true
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

                    // Token is at root level or nested inside data
                    const token = payload?.token || payload?.data?.token;

                    console.log("Full payload:", payload);
                    console.log("Token extracted:", token);

                    if (token) {
                        sessionStorage.setItem("talent_hold_token", JSON.stringify({ token }));
                        state.isLoggedIn = true;  // ← also mark as logged in!
                    } else {
                        console.warn("No token found in verifyOtp response");
                    }
                })
                .addCase(verifyOtp.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(registration.pending, (state) => {
                    state.loading = true
                })
                .addCase(registration.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.registerData = payload
                    state.error = false
                    sessionStorage.setItem("talent_hold_token", JSON.stringify({ token: payload?.token }))
                })
                .addCase(registration.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(getProfile.pending, (state) => {
                    state.loading = true
                })
                .addCase(getProfile.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.profileData = payload
                    state.error = false
                })
                .addCase(getProfile.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(updateProfile.pending, (state) => {
                    state.loading = true
                })
                .addCase(updateProfile.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.updateProfileData = payload
                    state.error = false
                })
                .addCase(updateProfile.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(uploadAvatar.pending, (state) => {
                    state.loading = true
                })
                .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.uploadAvatarData = payload
                    state.error = false
                })
                .addCase(uploadAvatar.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })

        }
    }
)

export const { resetAfterLoggedIn, clearCurrentUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer