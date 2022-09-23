import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const partsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = partsAdapter.getInitialState();

const partsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query({
      query: (type) => `/parts?type=${type}`,
      transformResponse: ({ parts }) => {
        return partsAdapter.setAll(initialState, parts);
      },
      providesTags: (result) => {
        const tags = result.ids.map((id) => ({ type: "Part", id }));
        return [{ type: "Part", id: "LIST" }, ...tags];
      },
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetPartsQuery } = partsApiSlice;

// ! https://stackoverflow.com/questions/72524054/how-to-getselectors-through-passing-arg-in-endpoint-select-in-redux-rtk

export const getPartsSelectors = (query) => {
  // returns the query result object
  const selectPartsResult = partsApiSlice.endpoints.getParts.select(query);

  // creates memoized selector
  const selectPartsData = createSelector(
    selectPartsResult,
    (partsResult) => partsResult.data // normalized state object with ids & entities
  );

  // returns selectors
  return partsAdapter.getSelectors(
    (state) => selectPartsData(state) ?? initialState
  );
};
