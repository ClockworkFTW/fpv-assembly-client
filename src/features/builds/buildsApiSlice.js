import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const buildsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = buildsAdapter.getInitialState();

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuilds: builder.query({
      query: () => ({
        url: `/builds`,
        method: "GET",
      }),
      transformResponse: ({ builds }) => {
        return buildsAdapter.setAll(initialState, builds);
      },
      providesTags: (result) => {
        const tags = result.ids.map((id) => ({ type: "Build", id }));
        return [{ type: "Build", id: "LIST" }, ...tags];
      },
    }),
    getBuild: builder.query({
      query: (buildId) => ({
        url: `/builds/${buildId}`,
        method: "GET",
      }),
      transformResponse: ({ build }) => build,
      providesTags: (result, error, arg) => [{ type: "Build", id: arg }],
    }),
    createBuild: builder.mutation({
      query: (build) => ({
        url: `/builds`,
        method: "POST",
        body: build,
      }),
      invalidatesTags: [{ type: "Build", id: "LIST" }],
    }),
    updateBuild: builder.mutation({
      query: ({ buildId, data }) => ({
        url: `/builds/${buildId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Build", id: arg.id }],
    }),
    deleteBuild: builder.mutation({
      query: (buildId) => ({
        url: `/builds/${buildId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Build", id: arg.id }],
    }),
    createBuildPart: builder.mutation({
      query: ({ buildId, partId }) => ({
        url: `/builds/${buildId}/parts/${partId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),
    updateBuildPart: builder.mutation({
      query: ({ buildId, partId, quantity }) => ({
        url: `/builds/${buildId}/parts/${partId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),
    deleteBuildPart: builder.mutation({
      query: ({ buildId, partId }) => ({
        url: `/builds/${buildId}/parts/${partId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),
  }),
});

export const {
  useGetBuildsQuery,
  useGetBuildQuery,
  useCreateBuildMutation,
  useUpdateBuildMutation,
  useDeleteBuildMutation,
  useCreateBuildPartMutation,
  useUpdateBuildPartMutation,
  useDeleteBuildPartMutation,
} = partsApiSlice;