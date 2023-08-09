import { combineReducers } from "redux";
import authSlice from "./authSlice";
import { apiSlice } from "./api";

export const rootReducer = combineReducers({
  authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
