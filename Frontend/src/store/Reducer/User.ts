import { ifSignin, ifSignup, ifUser } from "@/pages/Admin/Interface/User";
import instanceAxios from "@/utils/axios";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";




type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface Inital {
    loading: boolean,
    user: ifUser[],
    error: string,
    token: string | null,
    isToken: boolean
}

const initialState: Inital = {
    loading: false,
    user: [],
    error: "",
    token: null,
    isToken: false,
}

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const { data } = await instanceAxios.get<{ members: ifUser[] }>("http://localhost:8080/api/members");
    const filterPeople = data.members.filter((item: ifUser) => item.role !== "admin");
    return filterPeople;
});

export const signup = createAsyncThunk("user/signup", async (dataSignup: ifSignup) => {
    const { data } = await instanceAxios.post<ifSignup>("http://localhost:8080/api/signup", dataSignup);
    return data
});

export const signin = createAsyncThunk("user/signin", async (dataSignin: ifSignin) => {
    const { data } = await instanceAxios.post<ifSignin>("http://localhost:8080/api/signin", dataSignin);
    return data
});

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {

        checkToken: (state, action) => {
            state.isToken = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },


    },
    extraReducers: builder => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.user = action.payload;
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


export const { checkToken, setToken } = userReducer.actions

export default userReducer.reducer;