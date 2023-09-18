import { TypeSong, ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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


export const handAddSong = createAsyncThunk("song/addSong", async (song : ifSong) => {
    //todo <{ message : string}> định nghĩa type cho giá trị trả về
    const {data} = await axios.post<{ message : string}>("http://localhost:8080/api/Song", song);
    console.log(data);
    return data.message
})
export const handGetSong = createAsyncThunk("song/getSong", async () => {
    const {data} = await axios.get<{data : ifSong[]}>("http://localhost:8080/api/Song") 
    return data.data
})
export const handDeleteSong = createAsyncThunk("song/deleteSong", async (id : string) => {
    await axios.delete("http://localhost:8080/api/Song/"+ id) 
    return id
})
export const handUpdateSong = createAsyncThunk("song/updatesong", async (value : TypeSong) => {
    const {_id , ...datafake} = value;
    const {data} = await axios.put<{data : ifSong}>(`http://localhost:8080/api/Song/${_id}`, datafake) 
    console.log(data);
    return data.data
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
            // state.error = action.payload;
            // state.error = action.payload.message
        })
        builder.addCase(handDeleteSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handDeleteSong.fulfilled, (state, action) => {
            state.loading = true;
            state.song = state.song.filter(((song : ifSong) => song._id != action.payload))
            state.error = ""
        })
        builder.addCase(handDeleteSong.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
            // state.error = action.payload;
            // state.error = action.payload.message
        })
        builder.addCase(handUpdateSong.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(handUpdateSong.fulfilled, (state, action) => {
            state.loading = true;
            state.song = state.song.map((song => song._id == action.payload._id ? action.payload : song))
            state.error = ""
        })
        builder.addCase(handUpdateSong.rejected, (state, action) => {
            console.log(action);
            state.loading = true;
            // state.error = action.payload;
            // state.error = action.payload.message
        })
    }
})
export default songReducer.reducer;