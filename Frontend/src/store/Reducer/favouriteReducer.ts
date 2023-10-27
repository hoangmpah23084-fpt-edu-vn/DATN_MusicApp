import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




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

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2IzZDdjMTQyYTVlZmRmODdkMTU5MyIsImlhdCI6MTY5ODQxNDExMSwiZXhwIjoxNjk4NDE3NzExfQ.aBSKo9Dd33lHVzvmBDddzq_6-GUOiQ_3gzF2pkY45Bs"

export const addFavourite = createAsyncThunk("favourite/addFavourite", async (id_song: string) => {
    try {
        await axios.post("http://localhost:8080/api/songFavourites", { id_song }, {
            headers: {
                "Authorization": token
            }
        });
    } catch (error) {
        console.log(error);
    }
})

export const getFavourite = createAsyncThunk("favourite/getFavourite", async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/songFavourites", {
            headers: {
                "Authorization": token
            }
        });
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