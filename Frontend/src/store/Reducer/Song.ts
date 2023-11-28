import { IApiSong, ifSong, ifSongAdmin } from "@/pages/Admin/Interface/ValidateSong";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface initState {
    error: string,
    loading: boolean,
    song: ifSong[],
    totalSong: number,
    loadingRemove: boolean
}

const initialState: initState = {
    error: "",
    loading: false,
    song: [],
    totalSong: 0,
    loadingRemove: false
}
export const handAddSong = createAsyncThunk("song/addSong", async (song: ifSongAdmin) => {
    const { data } = await axios.post<{ message: string }>("http://localhost:8080/api/Song", song);
    return data.message
})
export const handGetSong = createAsyncThunk("song/getSong", async (option: IApiSong) => {
    const { data } = await axios.get(`http://localhost:8080/api/Song/?_limit=${option.pageSize}&_page=${option.page}&search=${option.search}`)
    return data
})
export const handDeleteSong = createAsyncThunk("song/deleteSong", async (id: string) => {
    await axios.delete("http://localhost:8080/api/Song/" + id)
    return id
})
export const handUpdateSong = createAsyncThunk("song/updatesong", async (value: ifSongAdmin) => {
    const { _id, ...datafake } = value;
    if (_id) {
        const { data } = await axios.put(`http://localhost:8080/api/Song/${_id}`, datafake)
        return data.data
    }
})
export const handGetOne = async (id: string) => {
    const { data } = await axios.get<{ data: ifSong }>("http://localhost:8080/api/Song/" + id)
    return data
}
const songReducer = createSlice({
    name: "Song",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(handAddSong.fulfilled, (state) => {
        })
            .addCase(handGetSong.pending, (state) => {
                state.loading = true;
            })
            .addCase(handGetSong.fulfilled, (state, action) => {
                state.loading = false;
                state.song = action.payload.data;
                state.error = ""
                state.totalSong = action.payload.totalSongList
            })
            .addCase(handGetSong.rejected, (state) => {
                state.loading = true;
            })
            .addCase(handDeleteSong.pending, (state) => {
                state.loadingRemove = true;
            })
            .addCase(handDeleteSong.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.song = state.song.filter(((song: ifSong) => song._id != action.payload))
                state.error = ""
            })
            .addCase(handDeleteSong.rejected, (state) => {
                state.loadingRemove = false;
            })
            .addCase(handUpdateSong.fulfilled, (state, action) => {
                if (action.payload) {
                    const { _id } = action.payload;
                    // state.song = state.song.map(((song : ifSong) => song._id == _id ? action.payload : song))
                    const data = state.song.filter(((song: ifSongAdmin) => song._id != _id))
                    state.song = [action.payload, ...data];
                    state.error = ""
                }
            })
    }
})
export default songReducer.reducer;