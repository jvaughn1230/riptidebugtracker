// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../apiSlice";

export const bugApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add bug
    addBug: builder.mutation({
      query: (data) => ({
        url: "/bugs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bug"],
    }),

    // Fetch Bugs
    fetchBugs: builder.query({
      query: () => ({
        url: "/bugs",
        method: "GET",
      }),
      providesTags: ["Bug"],
    }),

    // Fetch Bug
    fetchBug: builder.query({
      query: (id) => ({
        url: `/bugs/${id}`,
        method: "GET",
      }),
    }),

    // Update Bug
    updateBug: builder.mutation({
      query: (initialBug) => ({
        url: `/bugs/${initialBug.id}`,
        method: "PATCH",
        body: {
          ...initialBug,
        },
      }),
      invalidatesTags: ["Bug"],
    }),

    // Delete Bug
    deleteBug: builder.mutation({
      query: ({ id }) => ({
        url: `/bugs/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Bug"],
    }),
  }),
});

/*
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
*/

export const {
  useFetchBugsQuery,
  useGetBugQuery,
  useUpdateBugMutation,
  useAddBugMutation,
  useDeleteBugMutation,
} = bugApi;
