import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

import { initializePartsFilter } from "./PartsFilter/partsFilterSlice";

const partsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = partsAdapter.getInitialState();

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query({
      query: (partType) => ({
        url: partType ? `/parts?type=${partType}` : `/parts`,
        method: "GET",
      }),
      transformResponse: ({ parts }) => {
        return partsAdapter.setAll(initialState, parts);
      },
      async onQueryStarted(partType, { dispatch, queryFulfilled }) {
        if (partType) {
          try {
            const result = await queryFulfilled;
            const parts = result.data.ids.map((id) => result.data.entities[id]);
            dispatch(initializePartsFilter({ parts, partType }));
          } catch (error) {
            console.log(error); // TODO: Remove in prod
          }
        }
      },
      providesTags: (result) => {
        const tags = result.ids.map((id) => ({ type: "Part", id }));
        return [{ type: "Part", id: "LIST" }, ...tags];
      },
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
  useCreatePartMutation,
  useUpdatePartMutation,
  useDeletePartMutation,
} = partsApiSlice;
