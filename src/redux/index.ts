import { configureStore } from "@reduxjs/toolkit";
import expedienteReducer from "./expedienteReducer";
export const store = configureStore({
    reducer: {
        expediente: expedienteReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch