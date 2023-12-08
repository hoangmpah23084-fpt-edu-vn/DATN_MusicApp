import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISinger } from "../../pages/Admin/Interface/ISinger";
import instanceAxios from "@/utils/axios";

interface initState {
    error: string,
    loading: boolean,
    singer: ISinger[],
    dataOne: ISinger | null,
    loadingOne: boolean
}

const initialState: initState = {
    error: "",
    loading: false,
    singer: [],
    dataOne: null,
    loadingOne: false
}

export const handleAddSinger = createAsyncThunk("singer/add-singer", async (singer: ISinger) => {
    const { data } = await instanceAxios.post<{ message: string }>("http://localhost:8080/api/singer", singer);
    console.log(data);
    return data.message
})
export const handleGetSinger = createAsyncThunk("singers", async () => {
    const { data } = await instanceAxios.get<{ data: ISinger[] }>("http://localhost:8080/api/singers")
    return data.data
})
export const handleDeletesinger = createAsyncThunk("singer/delete-singer", async (id: string) => {
    await instanceAxios.delete("http://localhost:8080/api/singer/" + id)
    return id
})
export const handleUpdateSinger = createAsyncThunk("singer/update-singer", async (value: ISinger) => {
    const { _id, ...datafake } = value;
    const { data } = await instanceAxios.put<{ data: ISinger }>(`http://localhost:8080/api/singer/${_id}`, datafake)
    return data.data
})
export const handleGetOne = createAsyncThunk("singer/get-one", async (id: string) => {
    const { data } = await instanceAxios.get("http://localhost:8080/api/singer/" + id)
    return data.data
})

const singerReducer = createSlice({
    name: "singer",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(handleAddSinger.pending, (state) => {
            state.loading = true;
        })
            .addCase(handleAddSinger.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(handleAddSinger.rejected, (state) => {
                state.loading = false;
            })
            .addCase(handleGetSinger.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleGetSinger.fulfilled, (state, action) => {
                state.loading = true;
                state.singer = action.payload;
                state.error = ""
            })
            .addCase(handleGetSinger.rejected, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(handleDeletesinger.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleDeletesinger.fulfilled, (state, action) => {
                state.loading = true;
                state.singer = state.singer.filter((singer => singer._id != action.payload))
                state.error = ""
            })
            .addCase(handleDeletesinger.rejected, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(handleUpdateSinger.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleUpdateSinger.fulfilled, (state, action) => {
                state.loading = true;
                state.singer = state.singer.map((singer => singer._id == action.payload._id ? action.payload : singer))
                state.error = ""
            })
            .addCase(handleUpdateSinger.rejected, (state, action) => {
                console.log(action);
                state.loading = true;
            }).addCase(handleGetOne.pending, (state) => {
                state.loadingOne = true
            }).addCase(handleGetOne.rejected, (state) => {
                state.loadingOne = false
            }).addCase(handleGetOne.fulfilled, (state, action) => {
                state.loadingOne = false
                state.dataOne = action.payload
            })
    }
})
export default singerReducer.reducer;