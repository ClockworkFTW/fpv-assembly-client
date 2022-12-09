import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const partsAdapter = createEntityAdapter();

const initialState = partsAdapter.getInitialState();

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query({
      query: (query) => ({
        url: `/parts?${query}`,
        method: "GET",
      }),
      transformResponse: ({ parts, filter, pagination }) => {
        const normalizedParts = partsAdapter.setAll(initialState, parts);
        return { parts: normalizedParts, filter, pagination };
      },
      providesTags: ({ parts }) => {
        const tags = parts.ids.map((id) => ({ type: "Part", id }));
        return [{ type: "Part", id: "LIST" }, ...tags];
      },
    }),
    getPart: builder.query({
      query: (partId) => ({
        url: `/parts/${partId}`,
        method: "GET",
      }),
      transformResponse: ({ part }) => part,
    }),
    createPart: builder.mutation({
      query: (part) => ({
        url: `/parts`,
        method: "POST",
        body: part,
      }),
      invalidatesTags: [{ type: "Part", id: "LIST" }],
    }),
    updatePart: builder.mutation({
      query: ({ part, partId }) => ({
        url: `/parts/${partId}`,
        method: "PATCH",
        body: part,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Part", id: arg.id }],
    }),
    deletePart: builder.mutation({
      query: (partId) => ({
        url: `/parts/${partId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Part", id: arg.id }],
    }),
  }),
});

export const {
  useGetPartsQuery,
  useGetPartQuery,
  useCreatePartMutation,
  useUpdatePartMutation,
  useDeletePartMutation,
} = partsApiSlice;
