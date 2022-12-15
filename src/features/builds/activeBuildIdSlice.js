import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const activeBuildId = createSlice({
  name: "activeBuildId",
  initialState,
  reducers: { setActiveBuildId: (state, action) => action.payload },
});

export const { setActiveBuildId } = activeBuildId.actions;

export default activeBuildId.reducer;
