import { ifAlbum } from "@/pages/Admin/Interface/validateAlbum";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface album{
    loading : boolean,
    album : ifAlbum[],
    error : string,
}

const initialState : album = {
    loading : false,
    album : [],
    error : "",
}
export const addAlbum = createAsyncThunk("album/addAlbum", async (dataToForm : ifAlbum) => {
    const {data} = await axios.post<{data : ifAlbum}>("http://localhost:8080/api/album",dataToForm);
    return data.data;
})
export const getAlbum = createAsyncThunk("album/getAlbum", async () => {
    const {data} =  await axios.get<{data : ifAlbum[]}>("http://localhost:8080/api/album");
    return data.data;
})
export const deleteAlbum = createAsyncThunk("album/deleteAlbum", async (_id : string) => {
    const {data} = await axios.delete<{album : ifAlbum}>(`http://localhost:8080/api/album/${_id}`);
    return data.album;
})
export const updateAlbum = createAsyncThunk("album/updateAlbum", async (value : ifAlbum) => {
    const {_id , ...dataRest} = value;
    const {data} = await axios.patch<{album : ifAlbum}>(`http://localhost:8080/api/album/${_id}`, dataRest);
    return data.album;
})
export const getOneAlbum = async (id : string) => {
    const {data} = await axios.get(`http://localhost:8080/api/album/${id}`);
    return data
}

const albumReducer = createSlice({
    name: 'album',
    initialState,
    reducers :{},
    extraReducers : builder => {
        builder
        .addCase(addAlbum.pending, (state) => {
            state.loading = true
        })
        .addCase(addAlbum.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addAlbum.rejected, (state) => {
            state.loading = true;
        })
        .addCase(getAlbum.pending, (state) => {
            state.loading = true
        })
        .addCase(getAlbum.fulfilled, (state, action) => {
            state.loading = false;
            state.album = action.payload;
        })
        .addCase(getAlbum.rejected, (state) => {
            state.loading = true;
        })
        // .addCase(getOneAlbum.pending, (state) => {
        //     state.loading = true
        // })
        // .addCase(getOneAlbum.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.album = action.payload;
        // })
        // .addCase(getOneAlbum.rejected, (state) => {
        //     state.loading = true;
        // })
        .addCase(deleteAlbum.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteAlbum.fulfilled, (state, action) => {
            state.loading = false;
            state.album = state.album.filter(item => item._id != action.payload._id)
        })
        .addCase(deleteAlbum.rejected, (state) => {
            state.loading = true;
        })
    }
})

export default albumReducer.reducer