import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});
