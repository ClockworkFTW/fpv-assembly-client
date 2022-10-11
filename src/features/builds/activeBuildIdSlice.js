import { createSlice } from "@reduxjs/toolkit";

const key = "activeBuildId";

const initialState = null;

const activeBuildId = createSlice({
  name: "activeBuildId",
  initialState,
  reducers: {
    initializeActiveBuildId: (state, action) => {
      const activeBuildId = localStorage.getItem(key);
      return activeBuildId;
    },
    setActiveBuildId: (state, action) => {
      const activeBuildId = action.payload;
      localStorage.setItem(key, activeBuildId);
      return activeBuildId;
    },
    clearActiveBuildId: (state, action) => {
      localStorage.removeItem(key);
      return null;
    },
  },
});

export const { initializeActiveBuildId, setActiveBuildId, clearActiveBuildId } =
  activeBuildId.actions;

export default activeBuildId.reducer;
