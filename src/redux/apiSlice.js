import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  // TODO: when hosted change to hosted server base
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// and here
// let refreshRequest;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");

    // Try to get new token
    // Here
    // if (!refreshRequest) {
    //   refreshRequest = baseQuery("/auth/refresh", api, extraOptions);
    // }
    // To Here

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      console.log("refresh result has data");
      const user = api.getState().auth.user;

      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // Retry Original Query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("refresh result did not have data");
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tags: ["User", "Bug"],
  endpoints: (builder) => ({}),
});