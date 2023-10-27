import { IRoom } from "@/pages/Admin/Interface/Room";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface room {
    loading: boolean,
    room: IRoom[],
    error: string,
}

const initialState: room = {
    loading: false,
    room: [],
    error: "",
}
interface roomForm {
    nameGroup: string,
    password: string
}

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzdkYWM5ZTI4Zjg4ODVlMzY3ODA3NyIsImlhdCI6MTY5ODM5MzEzMywiZXhwIjoxNjk4Mzk2NzMzfQ.dFdDWhqtwUaNEdmHu1RGD7Sa-OiJ-JjZy1Upc0sM00Q"

export const addRoom = createAsyncThunk("room/addRoom", async (dataToForm: roomForm) => {
    const { data } = await axios.post<{ data: roomForm }>("http://localhost:8080/api/room", dataToForm, {
        headers: {
            "Authorization": token
        }
    });
    return data.data;
})
export const getRoom = createAsyncThunk("room/getRoom", async () => {
    const { data } = await axios.get<{ data: IRoom[] }>("http://localhost:8080/api/room");
    return data.data;
})



const roomReducer = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(addRoom.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRoom.rejected, (state) => {
                state.loading = true;
            })
            .addCase(getRoom.pending, (state) => {
                console.log(123);

                state.loading = true
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
            })
            .addCase(getRoom.rejected, (state) => {
                state.loading = true;
            })
    }
})

export default roomReducer.reducer
