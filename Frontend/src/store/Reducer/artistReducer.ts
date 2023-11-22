import { IArtist } from "@/pages/Admin/Interface/IArtist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initState {
    error: string,
    loading: boolean,
    artist: IArtist[]
}
const initialState: initState = {
    error: "",
    loading: false,
    artist: []
}

export const addArtist = createAsyncThunk("artist/addArtist", async (artist: IArtist) => {
    const { data } = await axios.post<{ data: IArtist }>("http://localhost:8080/api/artist", artist);
    return data.data;
})
export const handleGetArtist = createAsyncThunk("artist/handleGetArtist", async () => {
    const { data } = await axios.get<{ data: IArtist[] }>("http://localhost:8080/api/artists")
    return data.data;
})
export const deleteArtist = createAsyncThunk("artist/deleteArtist", async (id: string) => {
    await axios.delete("http://localhost:8080/api/artist/" + id);
    return id;
})
export const updateArtist = createAsyncThunk("artist/updateArtist", async (value: IArtist) => {
    const { _id, ...datafake } = value;
    if (_id) {
        const { data } = await axios.put<{ data: IArtist }>(`http://localhost:8080/api/artist/${_id}`, datafake);
        return data.data;
    }
})
export const getOne = async (id: string) => {
    const { data } = await axios.get<{ data: IArtist }>("http://localhost:8080/api/artist/" + id);
    return data;
}

const artistReducer = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addArtist.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(addArtist.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(handleGetArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handleGetArtist.fulfilled, (state, action) => {
            state.loading = true;
            state.artist = action.payload;
            state.error = "";
        })
        builder.addCase(handleGetArtist.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
        builder.addCase(deleteArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteArtist.fulfilled, (state, action) => {
            state.loading = true;
            state.artist = state.artist.filter(((artist: IArtist) => artist._id != action.payload));
            state.error = "";
        })
        builder.addCase(deleteArtist.rejected, (state) => {
            state.loading = true;
        })
        builder.addCase(updateArtist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateArtist.fulfilled, (state, action) => {
            if (action.payload) {
                const { _id } = action.payload;
                state.loading = true;
                const data = state.artist.filter(((artist: IArtist) => artist._id != _id));
                state.artist = [action.payload, ...data];
                state.error = "";
            }
        })
        builder.addCase(updateArtist.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
    }
})
export default artistReducer.reducer;