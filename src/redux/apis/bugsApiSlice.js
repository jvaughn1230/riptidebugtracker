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
    fetchBugsWithPagination: builder.query({
      query: (pageNumber) => ({
        url: `/bugs?page=${pageNumber}`,
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
      providesTags: (result, error, arg) => {
        if (error || !result || result.totalPage <= arg.pageParam + 1) {
          return ["Bug"];
        }
        return [];
      },
    }),

    //fetch recent bugs
    fetchRecentBugs: builder.query({
      query: () => ({
        url: "/bugs/recent",
        method: "GET",
      }),
      providesTags: ["RecentBugs"],
    }),

    //fetch upcoming bugs
    fetchUpcomingBugs: builder.query({
      query: () => ({
        url: "/bugs/upcoming",
        method: "GET",
      }),
      providesTags: ["UpcomingBugs"],
    }),

    // Fetch Bugs By project
    fetchBugsByProject: builder.query({
      query: (projectId) => ({
        url: `/bugs/project/$(projectId)`,
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
  useFetchBugsWithPaginationQuery,
  useFetchRecentBugsQuery,
  useFetchUpcomingBugsQuery,
  useFetcBugsByProjectQuery,
  useGetBugQuery,
  useUpdateBugMutation,
  useAddBugMutation,
  useDeleteBugMutation,
} = bugApi;
