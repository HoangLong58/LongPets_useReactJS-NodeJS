import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        currentAdmin: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentAdmin = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logoutAdmin: (state) => {
            state.currentAdmin = null;
            state.isFetching = false;
            state.error = false;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;