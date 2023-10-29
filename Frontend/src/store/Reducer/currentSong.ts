import { ifCurrentSong, ifSong, ifSongAdmin } from "@/pages/Admin/Interface/ValidateSong";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initState {
    error : string,
    loading : boolean,
    stateSong: boolean,
    currentSong : ifSong | null
}
const initialState : initState = {
    error : "",
    loading : false,
    stateSong : false,
    currentSong: null,
}

export const handGetCurrentSong = createAsyncThunk("currentSongReducer/getSong", (item : ifSong) => item);
export const handChangeStateSong = createAsyncThunk("currentSongReducer/stateSong", (item : boolean) => item);

const currentSong = createSlice({
    name: "currentSong",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(handGetCurrentSong.pending, (state) => {
            state.loading = true;
        })
        .addCase(handGetCurrentSong.fulfilled, (state, action) => {
            state.loading = false;
            state.currentSong =  action.payload;
        })
        .addCase(handGetCurrentSong.rejected, (state) => {
            state.loading = true;
        })
        .addCase(handChangeStateSong.fulfilled, (state, action) => {
            state.stateSong = action.payload;
        })
    }
})
export default currentSong.reducer