import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const partsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = partsAdapter.getInitialState();

export const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query({
      query: () => ({
        url: `/parts`,
        method: "GET",
      }),
      transformResponse: ({ parts }) => {
        return partsAdapter.setAll(initialState, parts);
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

// returns the query result object
export const selectPartsResult =
  partsApiSlice.endpoints.getParts.select("partsList");

// creates memoized selector
const selectPartsData = createSelector(
  selectPartsResult,
  (partsResult) => partsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllParts,
  selectById: selectPartById,
  selectIds: selectPartIds,
  // Pass in a selector that returns the parts slice of state
} = partsAdapter.getSelectors(
  (state) => selectPartsData(state) ?? initialState
);
