import { IRoom } from "@/pages/Admin/Interface/Room";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import instanceAxios from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface room {
    loading: boolean,
    room: IRoom[],
    listSong : ifSong[] | [],
    error: string,
}

const initialState: room = {
    loading: false,
    room: [],
    listSong : [],
    error: "",
}
interface roomForm {
    nameGroup: string,
    password: string
}

interface joinRoom {
    idChat: string,
    password: string
}



export const addRoom = createAsyncThunk("room/addRoom", async (dataToForm: roomForm) => {
    console.log(dataToForm);
    const { data } = await instanceAxios.post("/room", dataToForm)
    return data;
})
export const getRoom = createAsyncThunk("room/getRoom", async (search?: string) => {
    const { data } = await instanceAxios.get(`/room?search=${search ? search : ""}`);
    return data.data;
})

export const getDetailRoom = createAsyncThunk("room/getRoom", async (id: string) => {
    const { data } = await instanceAxios.get(`/room/${id}`);
    return data.data;
})

export const joinRoom = createAsyncThunk("room/joinRoom", async (dataForm: joinRoom) => {
    const { data } = await instanceAxios.post("/joinroom", dataForm)
    return data;
})
export const leaveRoom1 = createAsyncThunk("room/leaveRoom", async (id) => {
    const { data } = await instanceAxios.delete(`/leaveroom/${id}`)
    return data;
})
export const leaveRoom = async (id: string) => {
    await instanceAxios.delete(`/leaveroom/${id}`);
    console.log("leaveroom successfully");
}

const roomReducer = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setSongInRoom : (state, action) => {
            state.listSong = action.payload;
        },
        AddSongInRoom : (state, action) => {
            state.listSong = [...state.listSong, action.payload];
        },
        DeleteSongInRoom : (state, action) => {
            state.listSong = state.listSong.filter(item => item._id != action.payload._id)
        }
    },
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
                state.loading = true
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.room = action.payload;
            })
            .addCase(getRoom.rejected, (state) => {
                state.loading = true;
            })
            .addCase(joinRoom.pending, (state) => {
                state.loading = true
            })
            .addCase(joinRoom.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(joinRoom.rejected, (state) => {
                state.loading = true;
            })
            .addCase(leaveRoom1.fulfilled, (state, action) => {
                state.loading = false;
            })
    }
})

export const { setSongInRoom, AddSongInRoom, DeleteSongInRoom } = roomReducer.actions;
export default roomReducer.reducer
