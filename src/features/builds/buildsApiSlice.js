import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice, axiosQuery } from "app/api/apiSlice";

import { setNotification } from "features/notifications/notificationSlice";
import { setUploadProgress } from "features/builds/uploadProgressSlice";

const buildsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = buildsAdapter.getInitialState();

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Builds

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

    // Build Parts

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

    // Build Comments

    createBuildComment: builder.mutation({
      query: ({ buildId, parentId, message }) => ({
        url: `/builds/${buildId}/comments`,
        method: "POST",
        body: { parentId, message },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    updateBuildComment: builder.mutation({
      query: ({ buildId, commentId, message }) => ({
        url: `/builds/${buildId}/comments/${commentId}`,
        method: "PATCH",
        body: { message },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    deleteBuildComment: builder.mutation({
      query: ({ buildId, commentId }) => ({
        url: `/builds/${buildId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    // Build Comment Votes

    createBuildCommentVote: builder.mutation({
      query: ({ buildId, commentId, vote }) => ({
        url: `/builds/${buildId}/comments/${commentId}/vote`,
        method: "POST",
        body: { vote },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    updateBuildCommentVote: builder.mutation({
      query: ({ buildId, commentId, vote }) => ({
        url: `/builds/${buildId}/comments/${commentId}/vote`,
        method: "PATCH",
        body: { vote },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    deleteBuildCommentVote: builder.mutation({
      query: ({ buildId, commentId }) => ({
        url: `/builds/${buildId}/comments/${commentId}/vote`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    // Build Likes

    createBuildLike: builder.mutation({
      query: ({ buildId, likeId }) => ({
        url: `/builds/${buildId}/likes`,
        method: "POST",
        body: { likeId },
      }),
      onQueryStarted(
        { buildId, likeId, userId },
        { dispatch, queryFulfilled }
      ) {
        const createBuildLikeResult = dispatch(
          apiSlice.util.updateQueryData("getBuild", buildId, (build) => {
            const likes = [...build.likes, { id: likeId, userId }];
            Object.assign(build, { likes });
          })
        );
        queryFulfilled.catch(createBuildLikeResult.undo);
      },
    }),

    deleteBuildLike: builder.mutation({
      query: ({ buildId, likeId }) => ({
        url: `/builds/${buildId}/likes/${likeId}`,
        method: "DELETE",
      }),
      onQueryStarted({ buildId, likeId }, { dispatch, queryFulfilled }) {
        const deleteBuildLikeResult = dispatch(
          apiSlice.util.updateQueryData("getBuild", buildId, (build) => {
            const likes = build.likes.filter((like) => like.id !== likeId);
            Object.assign(build, { likes });
          })
        );
        queryFulfilled.catch(deleteBuildLikeResult.undo);
      },
    }),

    // Build Images

    uploadBuildImages: builder.mutation({
      queryFn: async ({ buildId, formData }, { dispatch, getState }) => {
        try {
          await axiosQuery(getState, dispatch, {
            method: "post",
            data: formData,
            url: `/builds/${buildId}/images`,
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: ({ progress }) => {
              dispatch(setUploadProgress(progress));
            },
          });
          return { data: null };
        } catch (error) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        } finally {
          dispatch(setUploadProgress(null));
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
    }),

    reorderBuildImages: builder.mutation({
      query: ({ buildId, images }) => ({
        url: `/builds/${buildId}/images`,
        method: "PATCH",
        body: { images },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        }
      },
    }),

    deleteBuildImage: builder.mutation({
      query: ({ buildId, imageId }) => ({
        url: `/builds/${buildId}/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Build", id: arg.buildId },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        }
      },
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
  useCreateBuildCommentMutation,
  useUpdateBuildCommentMutation,
  useDeleteBuildCommentMutation,
  useCreateBuildCommentVoteMutation,
  useUpdateBuildCommentVoteMutation,
  useDeleteBuildCommentVoteMutation,
  useCreateBuildLikeMutation,
  useDeleteBuildLikeMutation,
  useUploadBuildImagesMutation,
  useReorderBuildImagesMutation,
  useDeleteBuildImageMutation,
} = partsApiSlice;
