import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bugApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http:localhost:3500" }),
  reducerPath: "bugs",
  endpoints: (builder) => ({
    getBugs: builder.query({
      query: () => "/bugs",
      providesTags: ["bugs"],
    }),
    getBug: builder.query({}),
    updateBug: builder.mutation({
      query: (bug) => ({
        url: `/bugs/${bug.id}`,
        method: "PATCH",
        body: bug,
        invalidateTags: [""],
      }),
      addBug: builder.mutation({
        query: (bug) => ({
          url: "/bugs",
          method: "POST",
          body: bug,
          invalidateTags: [""],
        }),
      }),
    }),
  }),
});

export const {
  useGetBugsQuery,
  useGetBugQuery,
  useUpdateBugMutation,
  useAddBugMutation,
} = bugApi;
