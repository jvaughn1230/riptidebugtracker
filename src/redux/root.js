import { combineReducers } from "redux";
import authSlice from "./authSlice";
import { apiSlice } from "./api";

export const rootReducer = combineReducers({
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
