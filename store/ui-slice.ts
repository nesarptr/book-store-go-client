import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: false,
  reducers: {
    toggle: (state) => {
      state = !state;
    },
  },
});

export const { toggle } = uiSlice.actions;

export default uiSlice.reducer;
