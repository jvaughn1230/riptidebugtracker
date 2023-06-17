import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../components/bugController";

const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    getBugs: (state) => retrieveBugs(),

    createBugs: (state, action) => {},
    updateBug: (state, action) => {},
    completeBug: (state, action) => {},
  },
});

export default bugSlice.reducer;
export const { getBugs, createBugs, updateBug, completeBug } = bugSlice.actions;
