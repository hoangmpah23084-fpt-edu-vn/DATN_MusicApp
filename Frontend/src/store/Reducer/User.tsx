import { ifUser } from "@/pages/Admin/Interface/User";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Inital {
    loading : boolean,
    user : ifUser[],
    error : string,
}

const initialState : Inital = {
    loading : false,
    user : [],
    error : ""
}
export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const {data} = await axios.get<{members : ifUser[] }>("http://localhost:8080/api/members");
    const filterPeople = data.members.filter((item : ifUser) => item.role !== "admin");
    return filterPeople;
});

const userReducer = createSlice({
    name : "user",
    initialState,
    reducers : {

    },
    extraReducers : builder => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUsers.rejected, (state) => {
            state.loading = false;
        })
    }
})


export default userReducer.reducer;