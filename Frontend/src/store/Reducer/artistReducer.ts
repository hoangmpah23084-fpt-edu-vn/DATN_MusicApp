import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IArtist, TypeArtist } from "../../pages/Admin/Interface/IArtist";

interface initState {
    error : string,
    loading : boolean,
    artist : IArtist[]
}

const initialState: initState = {
    error : "",
    loading : false,
    artist : []
}

export const handleAddArtist = createAsyncThunk("artist/add-artist", async (artist : IArtist) => {
    const {data} = await axios.post<{ message : string}>("http://localhost:8080/api/artist", artist);
    console.log(data);
    return data.message
})
export const handleGetArtist = createAsyncThunk("artists", async () => {
    const {data} = await axios.get<{data : IArtist[]}>("http://localhost:8080/api/artists") 
    return data.data
})
export const handleDeleteArtist = createAsyncThunk("artist/delete-artist", async (id : string) => {
    await axios.delete("http://localhost:8080/api/artist/"+ id) 
    return id
})
export const handleUpdateArtist = createAsyncThunk("artist/update-artist", async (value : TypeArtist) => {
    const {_id , ...datafake} = value;
    const {data} = await axios.put<{data : IArtist}>(`http://localhost:8080/api/artist/${_id}`, datafake) 
    console.log(data);
    return data.data
})
export const handleGetOne = async (id : string) => {
    const {data} = await axios.get<{data : IArtist}>("http://localhost:8080/api/artist/"+ id)
    return data
}

const artistReducer = createSlice({
    name : "artist",
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(handleAddArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleAddArtist.fulfilled , (state) => {
            state.loading = false;
        })
        builder.addCase(handleAddArtist.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(handleGetArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleGetArtist.fulfilled, (state, action) => {
            state.loading = true;
            state.artist = action.payload;
            state.error = ""
        })
        builder.addCase(handleGetArtist.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
        builder.addCase(handleDeleteArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleDeleteArtist.fulfilled, (state, action) => {
            state.loading = true;
            state.artist = state.artist.filter((artist => artist._id != action.payload))
            state.error = ""
        })
        builder.addCase(handleDeleteArtist.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
        builder.addCase(handleUpdateArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleUpdateArtist.fulfilled, (state, action) => {
            state.loading = true;
            state.artist = state.artist.map((artist => artist._id == action.payload._id ? action.payload : artist))
            state.error = ""
        })
        builder.addCase(handleUpdateArtist.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
    }
})
export default artistReducer.reducer;