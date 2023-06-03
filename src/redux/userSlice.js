import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "username",
  initialState: [{}],
  reducers: {
    getUser: (state) => {
      state.push({ name: "Person1" });
      state.push({ name: "person2" });
    },
  },
});

export default userSlice.reducer;
export const { getUser } = userSlice.actions;
