import { createSlice } from "@reduxjs/toolkit";
import { bugs } from "../tempbug";

const bugSlice = createSlice({
  name: "bug",
  initialState: [],
  reducers: {
    getBugs: (state) => {
      bugs();
    },
    createBugs: (state, action) => {},
    updateBug: (state, action) => {},
    completeBug: (state, action) => {},
  },
});

export default bugSlice.reducer;
export const { getBugs, createBugs, updateBug, completeBug } = bugSlice.actions;
