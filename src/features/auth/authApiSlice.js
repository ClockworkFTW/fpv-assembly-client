import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

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
          console.log(error);
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
        } catch (error) {
          console.log(error);
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
        } catch (error) {
          console.log(error);
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
          console.log(error);
        }
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
