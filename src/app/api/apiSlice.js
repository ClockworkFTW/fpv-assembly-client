import axios from "axios";
import httpStatus from "http-status";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "features/auth/authSlice";

const BASE_URL = "https://jnb-api.ngrok.io/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === httpStatus.UNAUTHORIZED) {
    const refreshResult = await baseQuery(
      "/auth/refresh-access-token",
      api,
      extraOptions
    );

    if (refreshResult?.data?.token) {
      api.dispatch(setCredentials(refreshResult.data.token));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setCredentials(null));

      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Part"],
  endpoints: (builder) => ({}),
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosQuery = async (getState, dispatch, config) => {
  try {
    const { token } = getState().auth;

    if (token) {
      (config.headers ??= {}).Authorization = `Bearer ${token}`;
    }

    return await axiosInstance(config);
  } catch (error) {
    if (error.response.status === httpStatus.UNAUTHORIZED) {
      try {
        const refreshResult = await axiosInstance.get(
          "/auth/refresh-access-token"
        );

        dispatch(setCredentials(refreshResult.data.token));

        const bearerToken = `Bearer ${refreshResult.data.token}`;
        (config.headers ??= {}).Authorization = bearerToken;

        try {
          return await axiosInstance(config);
        } catch (error) {
          throw error;
        }
      } catch (error) {
        dispatch(setCredentials(null));
      }
    } else {
      throw error;
    }
  }
};
