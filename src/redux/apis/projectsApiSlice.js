import { apiSlice } from "../apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    fetchProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: (initialProject) => ({
        url: `/projects/${initialProject.id}`,
        method: "PATCH",
        body: {
          ...initialProject,
        },
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useFetchProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
