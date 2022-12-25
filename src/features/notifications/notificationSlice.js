import { createSlice } from "@reduxjs/toolkit";

import { sleep } from "util";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
  },
});

export const setNotification = async (dispatch, payload) => {
  dispatch(notificationSlice.actions.setNotification(payload));
  await sleep(5000);
  dispatch(notificationSlice.actions.setNotification(null));
};

export default notificationSlice.reducer;
