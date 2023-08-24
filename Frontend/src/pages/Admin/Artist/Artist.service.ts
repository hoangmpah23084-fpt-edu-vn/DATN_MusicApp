// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { IArtist } from "./IArtist";

// const artistAPI = createApi({
//   reducerPath: "artists",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080/api",
//   }),
//   tagTypes: ["artist"],
//   endpoints: (builder) => ({
//     //list
//     fetchArtist: builder.query<IArtist[], void>({
//       query: () => "/artists",
//       providesTags: ["artist"],
//     }),

//     // xóa
//     removeArtist: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/artists/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["artist"],
//     }),

//     //thêm
//     addArtist: builder.mutation<IArtist, Partial<IArtist>>({
//         query: (artist) => ({
//             url: "/artists",
//             method: "POST",
//             body: artist,
//         }),
//         invalidatesTags: ["artist"]
//     }),

//     //Sửa
//     updateArtist: builder.mutation<IArtist, Partial<IArtist>>({
//         query: (artist) => ({
//             url: `/artists/${artist._id}`,
//             method: "PUT",
//             body: artist,
//         }),
//         invalidatesTags: ["artist"],
//     }),
//   }),
// });

// export const { 
//     useFetchArtistQuery, 
//     useRemoveArtistMutation,
//     useAddArtistMutation,
//     useUpdateArtistMutation
// } = artistAPI;
// export default artistAPI.reducer;
