'use client';
import { configureStore } from '@reduxjs/toolkit';
import EstimateSlice from '../Reducer/EstimateSlice'
import ContactUsSlice from '../Reducer/ContactUsSlice'
import PartnerSlice from '../Reducer/PartnerSlice'
import DemoSlice from '../Reducer/DemoSlice'
import AuthSlice from '../Reducer/AuthSlice'
const store=configureStore(
    {
        reducer:{
            auth:AuthSlice,
            estimate:EstimateSlice,
            contact:ContactUsSlice,
            partner:PartnerSlice,
            demo:DemoSlice
        },
        devTools: process.env.NODE_ENV
    }
)
export default store