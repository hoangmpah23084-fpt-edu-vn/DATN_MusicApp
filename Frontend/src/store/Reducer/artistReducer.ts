import { IArtist } from "@/pages/Admin/Interface/IArtist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface artist {
    loading : boolean,
    artist : IArtist[],
    error : string,
}

const initialState : artist = {
    loading : false,
    artist : [],
    error : "",
}
export const addArtist = createAsyncThunk("artist/addArtist", async (dataToForm : IArtist) => {
    const {data} = await axios.post<{data : IArtist}>("http://localhost:8080/api/artist",dataToForm);
    return data.data;
})
export const handleGetArtist = createAsyncThunk("artist/getArtist", async () => {
    const {data} =  await axios.get<{data : IArtist[]}>("http://localhost:8080/api/artist");
    return data.data;
})
export const deleteArtist = createAsyncThunk("artist/deleteArtist", async (_id : string) => {
    const {data} = await axios.delete<{artist : IArtist}>(`http://localhost:8080/api/artist/${_id}`);
    return data.artist;
})
export const updateArtist = createAsyncThunk("artist/updateArtist", async (value : IArtist) => {
    const {_id , ...dataRest} = value;
    const {data} = await axios.put<{artist : IArtist}>(`http://localhost:8080/api/artist/${_id}`, dataRest);
    return data.artist;
})
export const getOneArtist = async (id : string) => {
    const {data} = await axios.get<{data : IArtist}>(`http://localhost:8080/api/artist/${id}`)
    return data
}

const artistReducer = createSlice({
    name: 'artist',
    initialState,
    reducers :{},
    extraReducers : builder => {
        builder
        .addCase(addArtist.pending, (state) => {
            state.loading = true
        })
        .addCase(addArtist.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addArtist.rejected, (state) => {
            state.loading = true;
        })
        .addCase(handleGetArtist.pending, (state) => {
            state.loading = true
        })
        .addCase(handleGetArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.artist = action.payload;
        })
        .addCase(handleGetArtist.rejected, (state) => {
            state.loading = true;
        })
        .addCase(deleteArtist.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteArtist.fulfilled, (state, action) => {
            state.loading = false;
            state.artist = state.artist.filter(item => item._id != action.payload._id)
        })
        .addCase(deleteArtist.rejected, (state) => {
            state.loading = true;
        })
    }
})

export default artistReducer.reducer