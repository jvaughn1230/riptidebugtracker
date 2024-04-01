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

export const {
  useFetchBugsQuery,
  useGetBugQuery,
  useUpdateBugMutation,
  useAddBugMutation,
  useDeleteBugMutation,
} = bugApi;
