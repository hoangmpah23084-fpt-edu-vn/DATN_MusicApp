import { IApiSinger } from "@/pages/Admin/Interface/ISinger";
import { ifAlbum } from "@/pages/Admin/Interface/validateAlbum";
import instanceAxios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface album {
    loading: boolean,
    album: ifAlbum[],
    error: string,
    listOneAlbum: ifAlbum | null,
}

const initialState: album = {
    loading: false,
    album: [],
    error: "",
    listOneAlbum: null
}
export const addAlbum = createAsyncThunk("album/addAlbum", async (dataToForm: ifAlbum) => {
    const { data } = await instanceAxios.post<{ data: ifAlbum }>("http://localhost:8080/api/album", dataToForm);
    return data.data;
})
export const getAlbum = createAsyncThunk("album/getAlbum", async (option?: IApiSinger) => {
    const { data } = await instanceAxios.get<{ data: ifAlbum[] }>(`http://localhost:8080/api/album?search=${option?.search ? option?.search : ""
        }`);
    return data.data;
})
export const deleteAlbum = createAsyncThunk("album/deleteAlbum", async (_id: string) => {
    const { data } = await instanceAxios.delete<{ album: ifAlbum }>(`http://localhost:8080/api/album/${_id}`);
    return data.album;
})
export const updateAlbum = createAsyncThunk("album/updateAlbum", async (value: ifAlbum) => {
    const { _id, ...dataRest } = value;
    const { data } = await instanceAxios.patch<{ album: ifAlbum }>(`http://localhost:8080/api/album/${_id}`, dataRest);
    return data.album;
})
export const getOneAlbum = createAsyncThunk("album/getOne", async (id: string) => {
    const { data } = await instanceAxios.get(`http://localhost:8080/api/album/${id}`)
    return data.data
})

const albumReducer = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
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
            .addCase(getOneAlbum.fulfilled, (state, action) => {
                state.listOneAlbum = action.payload.list_song
            })
    }
})

export default albumReducer.reducer