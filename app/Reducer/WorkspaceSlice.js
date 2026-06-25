import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const workspaceList = createAsyncThunk(
    'workspace/workspaceList',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.get('/workspace', userInput);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const createWorkspace = createAsyncThunk(
    'workspace/createWorkspace',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/workspace/create', userInput);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
)

export const setPrimaryWorkspace = createAsyncThunk(
    'workspace/setPrimaryWorkspace',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/workspace/primary/data', userInput);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
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
    loading: false,
    error: null,
    workspaceData: null,
    createWorkspaceData: null,
}

const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        clearWorkspaceError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(workspaceList.pending, (state) => {
                state.loading = true;
            })
            .addCase(workspaceList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.workspaceData = payload;
                state.error = null;
            })
            .addCase(workspaceList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(createWorkspace.pending, (state) => {
                state.loading = true;
            })
            .addCase(createWorkspace.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.createWorkspaceData = payload;
                state.error = null;
            })
            .addCase(createWorkspace.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(setPrimaryWorkspace.pending, (state) => {
                state.loading = true;
            })
            .addCase(setPrimaryWorkspace.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(setPrimaryWorkspace.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    }
})

export const { clearWorkspaceError } = WorkspaceSlice.actions;
export default WorkspaceSlice.reducer;
