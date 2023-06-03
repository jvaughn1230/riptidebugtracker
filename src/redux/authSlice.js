import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: false,
    loggedIn: false,
  },
  reducers: {
    signIn: (state, action) => {
      const { name, password } = action.payload;
      // Below are temp
      state.loggedIn = true;
      state.admin = true;
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.admin = false;
    },
  },
  createUser: (state, action) => {},
});

export default authSlice.reducer;

export const { signIn, signOut, createUser } = authSlice.actions;
