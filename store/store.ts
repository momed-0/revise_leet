import { configureStore } from "@reduxjs/toolkit";
import submissionsReducer from "./submissionsSlice";

const store = configureStore({
    reducer: {
        submissions: submissionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;