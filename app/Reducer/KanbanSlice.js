import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const getWorkspaceStages = createAsyncThunk(
    'kanban/getWorkspaceStages',
    async (workspaceId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/workspace-stages/workspace/${workspaceId}`);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

export const createWorkspaceStage = createAsyncThunk(
    'kanban/createWorkspaceStage',
    async (payload, { rejectWithValue }) => {
        // payload: { name, workspaceId, status }
        try {
            const response = await api.post('/workspace-stages', payload);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

export const updateWorkspaceStage = createAsyncThunk(
    'kanban/updateWorkspaceStage',
    async ({ id, payload }, { rejectWithValue }) => {
        // payload: { name, workspaceId, status }
        try {
            const response = await api.put(`/workspace-stages/${id}`, payload);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

export const deleteWorkspaceStage = createAsyncThunk(
    'kanban/deleteWorkspaceStage',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/workspace-stages/${id}`);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return { id, ...response.data };
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

export const updateCandidateStage = createAsyncThunk(
    'kanban/updateCandidateStage',
    async (payload, { rejectWithValue }) => {
        // payload: { submissionId, stageId }
        try {
            const response = await api.put('/candidate/workspace/stage/update', payload);
            if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
                return { payload, ...response.data };
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState = {
    loading: false,
    stageLoading: false,
    error: null,
    stages: [],              // workspace stages list
    localStageMap: {},       // submissionId -> stageId (for optimistic updates)
};

const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        // Optimistic update: set local stage mapping before API confirms
        setLocalStage: (state, { payload }) => {
            // payload: { submissionId, stageId }
            state.localStageMap[payload.submissionId] = payload.stageId;
        },
        // Rollback optimistic update on error
        rollbackLocalStage: (state, { payload }) => {
            // payload: { submissionId, prevStageId }
            state.localStageMap[payload.submissionId] = payload.prevStageId;
        },
        clearKanbanError: (state) => {
            state.error = null;
        },
        clearStages: (state) => {
            state.stages = [];
            state.localStageMap = {};
        },
    },
    extraReducers: (builder) => {
        builder
            // ── getWorkspaceStages
            .addCase(getWorkspaceStages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWorkspaceStages.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.stages = payload?.data || [];
            })
            .addCase(getWorkspaceStages.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // ── createWorkspaceStage
            .addCase(createWorkspaceStage.pending, (state) => {
                state.stageLoading = true;
            })
            .addCase(createWorkspaceStage.fulfilled, (state, { payload }) => {
                state.stageLoading = false;
                if (payload?.data) state.stages.push(payload.data);
            })
            .addCase(createWorkspaceStage.rejected, (state, { payload }) => {
                state.stageLoading = false;
                state.error = payload;
            })

            // ── updateWorkspaceStage
            .addCase(updateWorkspaceStage.pending, (state) => {
                state.stageLoading = true;
            })
            .addCase(updateWorkspaceStage.fulfilled, (state, { payload }) => {
                state.stageLoading = false;
                if (payload?.data) {
                    const idx = state.stages.findIndex(s => s.id === payload.data.id);
                    if (idx !== -1) state.stages[idx] = payload.data;
                }
            })
            .addCase(updateWorkspaceStage.rejected, (state, { payload }) => {
                state.stageLoading = false;
                state.error = payload;
            })

            // ── deleteWorkspaceStage
            .addCase(deleteWorkspaceStage.pending, (state) => {
                state.stageLoading = true;
            })
            .addCase(deleteWorkspaceStage.fulfilled, (state, { payload }) => {
                state.stageLoading = false;
                state.stages = state.stages.filter(s => s.id !== payload.id);
            })
            .addCase(deleteWorkspaceStage.rejected, (state, { payload }) => {
                state.stageLoading = false;
                state.error = payload;
            })

            // ── updateCandidateStage (just tracking loading, optimistic handled via reducer)
            .addCase(updateCandidateStage.pending, (state) => {
                // no-op: optimistic update already done via setLocalStage
            })
            .addCase(updateCandidateStage.fulfilled, (state) => {
                // confirmed – nothing else needed
            })
            .addCase(updateCandidateStage.rejected, (state, { payload }) => {
                state.error = payload;
                // rollback handled in component via rollbackLocalStage
            });
    }
});

export const { setLocalStage, rollbackLocalStage, clearKanbanError, clearStages } = KanbanSlice.actions;
export default KanbanSlice.reducer;
