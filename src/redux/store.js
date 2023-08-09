import { configureStore } from "@reduxjs/toolkit";
// import { bugApi } from "./apis/bugsApi";
import { rootReducer } from "./root";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  // Switch to false when hosted
  devTools: true,
});
