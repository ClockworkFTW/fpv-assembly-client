import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const activeBuildIdSlice = createSlice({
  name: "activeBuildId",
  initialState,
  reducers: {
    setActiveBuildId: (state, action) => action.payload,
  },
});

export const { setActiveBuildId } = activeBuildIdSlice.actions;

export default activeBuildIdSlice.reducer;
