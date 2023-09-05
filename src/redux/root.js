import { combineReducers } from "redux";
// import authSlice from "./authSlice";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";

export const rootReducer = combineReducers({
  // auth: authSlice,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
