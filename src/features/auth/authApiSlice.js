import { apiSlice } from "../../app/api/apiSlice";

import { setCredentials } from "./authSlice";
import { setNotification } from "../notifications/notificationSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-up/local",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data.token));
        } catch (error) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        }
      },
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in/local",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data.token));
        } catch ({ error }) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        }
      },
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setCredentials(null));
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          setNotification(dispatch, {
            type: "error",
            message: error.data.message,
          });
        }
      },
    }),
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-access-token",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data.token));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useRefreshAccessTokenMutation,
} = authApiSlice;
