import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        light: true
    },
    reducers: {
        changeMode: (state, action) => {
            state.light = action.payload;
        }
    }
});

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer; 
