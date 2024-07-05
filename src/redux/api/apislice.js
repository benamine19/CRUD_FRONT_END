import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'Tache',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://crud-e81t.onrender.com/tache/' }),
  tagTypes: ['Taches'],
  endpoints: (builder) => ({
    getTaches: builder.query({
      query: ({ userId, token }) => ({
        url: `Taches/${userId}`,
        method: 'GET',
        headers: {
            token: token,
          },
      }),
      providesTags: ['Taches'],
    }),
    createTache: builder.mutation({
      query: ({ token, data }) => ({
        url: 'createTache',
        method: 'POST',
        headers: {
          token: token,
          },
        body:data,
      }),
      invalidatesTags: ['Taches'],
    }),
    deleteTache: builder.mutation({
      query: ({ token, tacheId }) => ({
        url: `deleteTache/${tacheId}`,
        method: 'DELETE',
        headers: {
          token: token,
          },
      }),
      invalidatesTags: ['Taches'],
    }),
    getTache: builder.query({
      query: ({ token, tacheId }) => ({
        url: `getTache/${tacheId}`,
        method: 'GET',
        headers: {
          token: token,
          },
      }),
    }),
    updateTache: builder.mutation({
      query: ({ token, tacheId,data }) => ({
        url: `updateTache/${tacheId}`,
        method: 'PUT',
        headers: {
          token: token,
          },
          body:data ,
      }),
      invalidatesTags: ['Taches'],
    }),
  }),
});
export const { useCreateTacheMutation, useGetTachesQuery,useDeleteTacheMutation,useGetTacheQuery ,useUpdateTacheMutation} = apiSlice;