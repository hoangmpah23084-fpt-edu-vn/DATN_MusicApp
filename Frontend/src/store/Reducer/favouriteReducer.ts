import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import instanceAxios from "@/utils/axios";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


interface initState {
    loading: boolean,
    error: string,
    listFavourites: ifSong[]
}

const initialState: initState = {
    loading: false,
    error: "",
    listFavourites: []
}


export const addFavourite = createAsyncThunk("favourite/addFavourite", async (id_song: string) => {
    try {
        const { data } = await instanceAxios.post("http://localhost:8080/api/songFavourites", { id_song });
        return data
    } catch (error) {
        console.log(error);
    }
})

export const getFavourite = createAsyncThunk("favourite/getFavourite", async () => {
    try {
        const { data } = await instanceAxios.get("http://localhost:8080/api/songFavourites");
        return data
    } catch (error) {
        console.log(error);
    }
})


const favouriteReducer = createSlice({
    name: "favourite",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addFavourite.fulfilled, () => {
            }).addCase(getFavourite.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                state.loading = false
                state.listFavourites = action.payload.list_songFavourites.list_songFavourites
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true
                }
            ).addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loading = false
                }
            ).addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false
                }
            )
    }
})
export default favouriteReducer.reducer;