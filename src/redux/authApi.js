import { apiSlice } from "./api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        mode: "cors",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
