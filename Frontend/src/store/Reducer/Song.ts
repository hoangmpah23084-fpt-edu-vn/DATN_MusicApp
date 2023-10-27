import {  ifSong, ifSongAdmin } from "@/pages/Admin/Interface/ValidateSong";
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initState {
    error : string,
    loading : boolean,
    song : ifSong[]
}

const initialState: initState = {
    error : "",
    loading : false,
    song : []
}
export const handAddSong = createAsyncThunk("song/addSong", async (song : ifSongAdmin) => {
    //todo <{ message : string}> định nghĩa type cho giá trị trả về
    const {data} = await axios.post<{ message : string}>("http://localhost:8080/api/Song", song);
    console.log(data);
    return data.message
})
export const handGetSong = createAsyncThunk("song/getSong", async () => {
    const {data} = await axios.get<{data : ifSong[] | any}>("http://localhost:8080/api/Song") 
    return data.data
})
export const handDeleteSong = createAsyncThunk("song/deleteSong", async (id : string) => {
    await axios.delete("http://localhost:8080/api/Song/"+ id) 
    return id
})
export const handUpdateSong = createAsyncThunk("song/updatesong", async (value : ifSong) => {
    const {_id , ...datafake} = value;
    if (_id) {
        const {data} = await axios.put<{data : ifSong}>(`http://localhost:8080/api/Song/${_id}`, datafake) 
        return data.data
    }

})
export const handGetOne = async (id : string) => {
    const {data} = await axios.get<{data : ifSong}>("http://localhost:8080/api/Song/"+ id)
    return data
}
const songReducer = createSlice({
    name : "Song",
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(handAddSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handAddSong.fulfilled , (state) => {
            state.loading = false;
        })
        builder.addCase(handAddSong.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(handGetSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handGetSong.fulfilled, (state, action) => {
            state.loading = true;
            state.song = action.payload;
            state.error = ""
        })
        builder.addCase(handGetSong.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
        builder.addCase(handDeleteSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handDeleteSong.fulfilled, (state, action) => {
            state.loading = true;
            state.song = state.song.filter(((song : ifSong) => song._id != action.payload))
            state.error = ""
        })
        builder.addCase(handDeleteSong.rejected, (state) => {
            state.loading = true;
        })
        builder.addCase(handUpdateSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handUpdateSong.fulfilled, (state, action) => {
            if (action.payload) {
                const {_id} = action.payload;
                state.loading = true;
                // state.song = state.song.map(((song : ifSong) => song._id == _id ? action.payload : song))
                const data = state.song.filter(((song : ifSong) => song._id != _id ))
                state.song = [action.payload, ...data];
                state.error = ""
            }
        })
        builder.addCase(handUpdateSong.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
        })
    }
})
export default songReducer.reducer;