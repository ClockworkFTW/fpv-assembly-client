import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { apiSlice } from "./api/apiSlice";

import authReducer from "../features/auth/authSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import activeBuildIdReducer from "../features/builds/activeBuildIdSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    notification: notificationReducer,
    activeBuildId: activeBuildIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
