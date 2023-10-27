import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


interface initState {

}

const initialState: initState = {

}

export const addFavourite = createAsyncThunk("favourite/addFavourite", async () => {
    const { data } = await axios.post("http://localhost:8080/api/genre");
    return data.data;
})


const favouriteReducer = createSlice({
    name: "favourite",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addFavourite.fulfilled, (state, action) => {

        }).addMatcher<PendingAction>(
            (action) => action.type.endsWith('/pending'),
            (state, action) => {
            }
        ).addMatcher<RejectedAction>(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
            }
        ).addMatcher<FulfilledAction>(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action) => {
            }
        )
    }
})
export default favouriteReducer.reducer;