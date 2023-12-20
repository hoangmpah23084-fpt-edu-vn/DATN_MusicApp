import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initState {
    error: string,
    loading: boolean,
    stateSong: boolean,
    currentSong: ifSong | null,
    dataLocal: ifSong | null
}
const initialState: initState = {
    error: "",
    loading: false,
    stateSong: false,
    currentSong: null,
    dataLocal: null
}

export const handGetCurrentSong = createAsyncThunk("currentSongReducer/getSong", (item: ifSong) => item);
export const handChangeStateSong = createAsyncThunk("currentSongReducer/stateSong", (item: boolean) => item);

const currentSong = createSlice({
    name: "currentSong",
    initialState: initialState,
    reducers: {
        setDataLocal: (state, action: PayloadAction<ifSong>) => {
            state.dataLocal = action.payload
        },
        setCurrentSong:(state, action: PayloadAction<any>) => {
            state.currentSong = action.payload; 
            // console.log('NewPayload : ', action.payload);
        },
        setStateSong:(state, action: PayloadAction<boolean>) => {
            state.stateSong = action.payload; 
        },
    },
    extraReducers: builder => {
        builder
            .addCase(handGetCurrentSong.pending, (state) => {
                state.loading = true;
            })
            .addCase(handGetCurrentSong.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSong = action.payload;
            })
            .addCase(handGetCurrentSong.rejected, (state) => {
                state.loading = true;
            })
            .addCase(handChangeStateSong.fulfilled, (state, action) => {
                state.stateSong = action.payload;
            })
    }
})
export const { setDataLocal,setCurrentSong, setStateSong } = currentSong.actions;
export default currentSong.reducer