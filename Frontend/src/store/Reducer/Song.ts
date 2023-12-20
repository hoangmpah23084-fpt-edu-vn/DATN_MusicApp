// import { ifSong, ifSongAdmin } from "@/pages/Admin/Interface/ValidateSong";
import { IGenre } from "@/pages/Admin/Interface/genre";
import { IApiSong, ifSong } from "@/pages/Admin/Interface/ValidateSong";
import instanceAxios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface initState {
    error: string;
    loading: boolean;
    song: ifSong[];
    totalSong: number;
    loadingRemove: boolean;
    loadingGetone: boolean;
    dataOne: ifSong | null;
    loadingAdd: boolean;
    loadingSearch: boolean;
    songSearch: ifSong[],
    isSongHistory: boolean
}

const initialState: initState = {
    error: "",
    loading: false,
    song: [],
    totalSong: 0,
    loadingRemove: false,
    loadingGetone: false,
    dataOne: null,
    loadingAdd: false,
    loadingSearch: false,
    songSearch: [],
    isSongHistory: false
};
export const handAddSong = createAsyncThunk(
    "song/addSong",
    async (song: ifSong) => {
        const { data } = await instanceAxios.post<{ message: string }>(
            "http://localhost:8080/api/Song",
            song
        );
        return data.message;
    }
);
export const handGetSong = createAsyncThunk(
    "song/getSong",
    async (option?: IApiSong) => {
        const { data } = await instanceAxios.get(
            `http://localhost:8080/api/Song/?_limit=${option?.pageSize ? option?.pageSize : 10
            }&_page=${option?.page ? option?.page : 1}&search=${option?.search ? option?.search : ""
            }&_sort=${option?.sort ? option?.sort : "createdAt"}&_order=${option?.order ? option?.order : "desc"}`
        );
        return data;
    }
);

export const handGetSongSearch = createAsyncThunk(
    "song/getSongSearch",
    async (option?: IApiSong) => {
        const { data } = await instanceAxios.get(
            `http://localhost:8080/api/Song/?_limit=${option?.pageSize ? option?.pageSize : 10
            }&_page=${option?.page ? option?.page : 1}&search=${option?.search ? option?.search : ""
            }&_sort=${option?.sort ? option?.sort : "createdAt"}&_order=${option?.order ? option?.order : "desc"}`
        );
        return data;
    }
);

export const handDeleteSong = createAsyncThunk(
    "song/deleteSong",
    async (id: string) => {
        await axios.delete("http://localhost:8080/api/Song/" + id);
        return id;
    }
);
export const handUpdateSong = createAsyncThunk(
    "song/updatesong",
    async (value: ifSong) => {
        const { _id, ...datafake } = value;
        if (_id) {
            const { data } = await instanceAxios.put(
                `http://localhost:8080/api/Song/${_id}`,
                datafake
            );
            return data.data;
        }
    }
);
export const handGetOne = createAsyncThunk(
    "song/handGetOne",
    async (id: string) => {
        const { data } = await instanceAxios.get(
            "http://localhost:8080/api/Song/" + id
        );
        return data.data;
    }
);
export const setSingerSong = createAsyncThunk('setSingerSong/Get', async (id: string) => {
    const { data } = await axios.get(`http://localhost:8080/api/singer/${id}`).then(({ data }) => data);
    console.log(data);
    return data.songs
})

const songReducer = createSlice({
    name: "Song",
    initialState,
    reducers: {
        setSongFavourite: (state, action) => {
            state.song = action.payload;
        },
        setSongHistory: (state) => {
            state.isSongHistory = !state.isSongHistory;
        },
        setListSongSongHistory: (state, action) => {
            state.song = action.payload;
        },
        addSongtoSideBarSong: (state, action) => {
            const findData = state.song.filter(item => item._id == action.payload._id);
            if (findData.length > 0) {
                toast.warning("Bài nhạc đã tồn tại")
                return
            }else{
                state.song = [...state.song, action.payload];
            }
        },
        addSongToNextSong : (state, action) => {
            const findData = state.song.filter(item => item._id == action.payload.song._id);
            if (findData.length > 0) {
                toast.warning("Bài nhạc đã tồn tại")
                return;
            }
            if (action.payload.findSong < 0) {
                state.song = [action.payload.song, ...state.song]
            }else{
                state.song.splice(action.payload.findSong + 1, 0, action.payload.song);
            }            
        },
        deleteSongInListSong: (state, action) => {
            state.song = state.song.filter(item => item._id != action.payload._id); 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handAddSong.pending, (state) => {
                state.loadingAdd = true;
            })
            .addCase(handAddSong.rejected, (state) => {
                state.loadingAdd = false;
            })
            .addCase(handAddSong.fulfilled, (state) => {
                state.loadingAdd = false;
            })
            .addCase(handGetSong.pending, (state) => {
                state.loading = true;
            })
            .addCase(handGetSong.fulfilled, (state, action) => {
                state.loading = false;
                state.song = action.payload.data;
                state.error = "";
                state.totalSong = action.payload.totalSongList;
            })
            .addCase(handGetSong.rejected, (state) => {
                state.loading = true;
            })
            .addCase(handDeleteSong.pending, (state) => {
                state.loadingRemove = true;
            })
            .addCase(handDeleteSong.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.song = state.song.filter(
                    (song: ifSong) => song._id != action.payload
                );
                state.error = "";
            })
            .addCase(handDeleteSong.rejected, (state) => {
                state.loadingRemove = false;
            })
            .addCase(handUpdateSong.fulfilled, (state, action) => {
                if (action.payload) {
                    const { _id } = action.payload;
                    // state.song = state.song.map(((song : ifSong) => song._id == _id ? action.payload : song))
                    const data = state.song.filter((song) => song._id != _id);
                    state.song = [action.payload, ...data];
                    state.error = "";
                }
            })
            .addCase(handGetOne.rejected, (state) => {
                state.loadingGetone = true;
            })
            .addCase(handGetOne.pending, (state) => {
                state.loadingGetone = true;
            })
            .addCase(handGetOne.fulfilled, (state, action) => {
                state.loadingGetone = false;
                state.dataOne = action.payload;
            }).addCase(handGetSongSearch.pending, (state) => {
                state.loadingSearch = true
            }).addCase(handGetSongSearch.rejected, (state) => {
                state.loadingSearch = false;
            }).addCase(handGetSongSearch.fulfilled, (state, action) => {
                state.songSearch = action.payload.data
                state.loadingSearch = false;
            })
            .addCase(setSingerSong.fulfilled, (state, action) => {
                state.song = action.payload;
            })
    },
});

export const { setSongFavourite, setSongHistory, setListSongSongHistory, addSongtoSideBarSong, addSongToNextSong, deleteSongInListSong } = songReducer.actions;
export default songReducer.reducer;
