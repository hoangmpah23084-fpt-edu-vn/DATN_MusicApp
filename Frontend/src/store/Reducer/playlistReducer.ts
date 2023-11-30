
import instanceAxios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState: any = {
    loading: false,
    playlist: [],
    playlistDetail:{},
    error: "",
}



export const createPlaylist = createAsyncThunk("playlist", async (dataToForm: {
    name: string
}) => {
    const { data } = await instanceAxios.post("/playlist", dataToForm)
    return data;
})

export const getPlaylists = createAsyncThunk("/playlists", async () => {
    const { data } = await instanceAxios.get(`/playlist`);
    return data.data;
})

export const getPlaylist = createAsyncThunk("/playlist/:id", async (id : string) => {
    const { data } = await instanceAxios.get(`/playlist/${id}`);
    return data.data;
})

export const deletePlaylist = createAsyncThunk("/delete/playlist/:id", async (id:any) => {
    const { data } = await instanceAxios.delete(`/playlist/${id}`)
    return data;
})

export const addSongToPlaylist = createAsyncThunk("/playlist/create/song/:id", async (id) => {
    const { data } = await instanceAxios.post(`/playlist/song/${id}`)
    return data;
})

export const deleteSongToPlaylist = createAsyncThunk("/playlist/delete/song/:id", async (id: string,params:any) => {
    const { data } = await instanceAxios.put(`/playlist/song/${id}`, params)
    return data;
})


const playlistReducer = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getPlaylists.pending, (state) => {
            state.loading = true
        })
        .addCase(getPlaylists.fulfilled, (state,action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
        .addCase(getPlaylists.rejected, (state) => {
            state.loading = true;
        })
        .addCase(getPlaylist.pending, (state) => {
            state.loading = true
        })
        .addCase(getPlaylist.fulfilled, (state,action) => {
            state.loading = false;
            console.log("action",action.payload);
            
            state.playlistDetail = action.payload;
        })
        .addCase(getPlaylist.rejected, (state) => {
            state.loading = true;
        })
        .addCase(createPlaylist.pending, (state) => {
            state.loading = true
        })
        .addCase(createPlaylist.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(createPlaylist.rejected, (state) => {
            state.loading = true;
        })
        .addCase(addSongToPlaylist.pending, (state) => {
            state.loading = true
        })
        .addCase(addSongToPlaylist.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addSongToPlaylist.rejected, (state) => {
            state.loading = true;
        })
        .addCase(deleteSongToPlaylist.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteSongToPlaylist.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteSongToPlaylist.rejected, (state) => {
            state.loading = true;
        })
           
    }
})

export default playlistReducer.reducer
