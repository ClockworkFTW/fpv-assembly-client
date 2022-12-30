import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const uploadProgressSlice = createSlice({
  name: "uploadProgress",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => action.payload,
  },
});

export const { setUploadProgress } = uploadProgressSlice.actions;

export default uploadProgressSlice.reducer;
