'use client';
import { configureStore } from '@reduxjs/toolkit';
import EstimateSlice from '../Reducer/EstimateSlice'
import ContactUsSlice from '../Reducer/ContactUsSlice'
import PartnerSlice from '../Reducer/PartnerSlice'
import DemoSlice from '../Reducer/DemoSlice'
import AuthSlice from '../Reducer/AuthSlice'
import FormbuilderSlice from './FormbuilderSlice';
import CandidateSlice from './CandidateSlice';
import PlanSlice from './PlanSlice';
import WorkspaceSlice from './WorkspaceSlice';
import KanbanSlice from './KanbanSlice';
import StorageSlice from './StorageSlice';
const store=configureStore(
    {
        reducer:{
            auth:AuthSlice,
            workspace:WorkspaceSlice,
            estimate:EstimateSlice,
            contact:ContactUsSlice,
            partner:PartnerSlice,
            demo:DemoSlice,
            formBuilder:FormbuilderSlice,
            candidate:CandidateSlice,
            plan:PlanSlice,
            kanban:KanbanSlice,
            storage:StorageSlice
        },
        devTools: process.env.NODE_ENV
    }
)
export default store