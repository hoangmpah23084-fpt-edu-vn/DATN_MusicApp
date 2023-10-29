import { ifAlbum, ifGenre } from "@/pages/Admin/Interface/validateAlbum";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface album{
    loading : boolean,
    genre : ifGenre[] ,
    error : string,
}

const initialState : album = {
    loading : false,
    genre : [],
    error : "",
}
export const addGenre = createAsyncThunk("genre/addGenre", async (dataToForm : ifAlbum) => {
    const {data} = await axios.post<{data : ifGenre}>("http://localhost:8080/api/genre",dataToForm);
    return data.data;
})
export const getGenre = createAsyncThunk("genre/getGenre", async () => {
    const {data} =  await axios.get<{data : ifGenre[]}>("http://localhost:8080/api/genre");
    return data.data;
})
export const deleteGenre = createAsyncThunk("genre/deleteGenre", async (_id : string) => {
    const {data} = await axios.delete<{genre : ifGenre}>(`http://localhost:8080/api/genre/${_id}`);
    return data.genre;
})
export const updateGenre = createAsyncThunk("genre/updateGenre", async (value : ifGenre) => {
    const {_id , ...dataRest} = value;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const {data} = await axios.put<{genre : ifGenre}>(`http://localhost:8080/api/genre/${_id}`, dataRest);
    return data.genre;
})
export const getOneGenre = async (id : string) => {
    const {data} = await axios.get<{data : ifGenre}>(`http://localhost:8080/api/genre/${id}`)
    return data
}

const genreReducer = createSlice({
    name: 'genre',
    initialState,
    reducers :{},
    extraReducers : builder => {
        builder
        .addCase(addGenre.pending, (state) => {
            state.loading = true
        })
        .addCase(addGenre.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addGenre.rejected, (state) => {
            state.loading = true;
        })
        .addCase(getGenre.pending, (state) => {
            state.loading = true
        })
        .addCase(getGenre.fulfilled, (state, action) => {
            state.loading = false;
            state.genre = action.payload;
        })
        .addCase(getGenre.rejected, (state) => {
            state.loading = true;
        })
        .addCase(deleteGenre.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteGenre.fulfilled, (state, action) => {
            state.loading = false;
            state.genre = state.genre.filter(item => item._id != action.payload._id)
        })
        .addCase(deleteGenre.rejected, (state) => {
            state.loading = true;
        })
    }
})

export default genreReducer.reducer