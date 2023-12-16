import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiSinger, ISinger } from "../../pages/Admin/Interface/ISinger";
import instanceAxios from "@/utils/axios";
import axios from "axios";

interface initState {
    error: string,
    loading: boolean,
    singer: ISinger[],
    totalSinger: number;
    loadingRemove: boolean;
    loadingGetone: boolean;
    dataOne: ISinger | null,
    loadingAdd: boolean;
    loadingSearch: boolean;
    singerSearch: ISinger[]
}

const initialState: initState = {
    error: "",
    loading: false,
    singer: [],
    totalSinger: 0,
    loadingRemove: false,
    loadingGetone: false,
    dataOne: null,
    loadingAdd: false,
    loadingSearch: false,
    singerSearch: []
}

export const handleAddSinger = createAsyncThunk(
    "singer/addSinger",
    async (singer: ISinger) => {
        const { data } = await instanceAxios.post<{ message: string }>(
            "http://localhost:8080/api/singer",
            singer
        );
        return data.message;
    }
);

export const handleGetSinger = createAsyncThunk(
    "singer/getSinger",
    async (option?: IApiSinger) => {
        const { data } = await instanceAxios.get(
            `http://localhost:8080/api/singers/?_limit=${option?.pageSize ? option?.pageSize : 10
            }&_page=${option?.page ? option?.page : 1}&search=${option?.search ? option?.search : ""
            }&_sort=${option?.sort ? option?.sort : "createdAt"}&_order=${option?.order ? option?.order : "desc"}`
        );
        return data;
    }
);

export const handleGetSingerSearch = createAsyncThunk(
    "singer/getSingerSearch",
    async (option?: IApiSinger) => {
        const { data } = await instanceAxios.get(
            `http://localhost:8080/api/singers/?_limit=${option?.pageSize ? option?.pageSize : 10
            }&_page=${option?.page ? option?.page : 1}&search=${option?.search ? option?.search : ""
            }&_sort=${option?.sort ? option?.sort : "createdAt"}&_order=${option?.order ? option?.order : "desc"}`
        );
        return data;
    }
);

export const handleDeletesinger = createAsyncThunk(
    "singer/deleteSinger",
    async (id: string) => {
        await axios.delete("http://localhost:8080/api/singer/" + id);
        return id;
    }
);

export const handleUpdateSinger = createAsyncThunk(
    "singer/updateSinger",
    async (value: ISinger) => {
        const { _id, ...datafake } = value;
        if (_id) {
            const { data } = await instanceAxios.put(
                `http://localhost:8080/api/singer/${_id}`,
                datafake
            );
            return data.data;
        }
    }
);

export const handleGetOne = createAsyncThunk(
    "singer/handleGetOne",
    async (id: string) => {
        const { data } = await instanceAxios.get(
            "http://localhost:8080/api/singer/" + id
        );
        return data.data;
    }
);

export const setSingerSong = createAsyncThunk('setSingerSong/Get', async (id) => {
    const {data} = await axios.get(`http://localhost:8080/api/singer/${id}`).then(({data})=> data);
    console.log(data);
    return data.singers
})

const singerReducer = createSlice({
    name: "singer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleAddSinger.pending, (state) => {
                state.loadingAdd = true;
            })
            .addCase(handleAddSinger.rejected, (state) => {
                state.loadingAdd = false;
            })
            .addCase(handleAddSinger.fulfilled, (state) => {
                state.loadingAdd = false;
            })
            .addCase(handleGetSinger.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleGetSinger.fulfilled, (state, action) => {
                state.loading = false;
                state.singer = action.payload.data;
                state.error = "";
                state.totalSinger = action.payload.totalSingerList;
            })
            .addCase(handleGetSinger.rejected, (state) => {
                state.loading = true;
            })
            .addCase(handleDeletesinger.pending, (state) => {
                state.loadingRemove = true;
            })
            .addCase(handleDeletesinger.fulfilled, (state, action) => {
                state.loadingRemove = false;
                state.singer = state.singer.filter(
                    (singer: ISinger) => singer._id != action.payload
                );
                state.error = "";
            })
            .addCase(handleDeletesinger.rejected, (state) => {
                state.loadingRemove = false;
            })
            .addCase(handleUpdateSinger.fulfilled, (state, action) => {
                if (action.payload) {
                    const { _id } = action.payload;
                    // state.singer = state.singer.map(((singer : ifsinger) => singer._id == _id ? action.payload : singer))
                    const data = state.singer.filter((singer) => singer._id != _id);
                    state.singer = [action.payload, ...data];
                    state.error = "";
                }
            })
            .addCase(handleGetOne.rejected, (state) => {
                state.loadingGetone = true;
            })
            .addCase(handleGetOne.pending, (state) => {
                state.loadingGetone = true;
            })
            .addCase(handleGetOne.fulfilled, (state, action) => {
                state.loadingGetone = false;
                state.dataOne = action.payload;
            }).addCase(handleGetSingerSearch.pending, (state) => {
                state.loadingSearch = true
            }).addCase(handleGetSingerSearch.rejected, (state) => {
                state.loadingSearch = false;
            }).addCase(handleGetSingerSearch.fulfilled, (state, action) => {
                state.singerSearch = action.payload.data
                state.loadingSearch = false;
            })
            .addCase(setSingerSong.fulfilled, (state, action) => {
                state.singer = action.payload;  
            })
    },
});

export default singerReducer.reducer;