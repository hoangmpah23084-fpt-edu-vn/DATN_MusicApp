import { ifSignin, ifSignup, ifUser, ifUserUpdate, ifUserUpgrade } from "@/pages/Admin/Interface/User";
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
    isToken: boolean,
    dataUserOne: ifUser | null,
    loadingPass: boolean,
}

const initialState: Inital = {
    loading: false,
    user: [],
    error: "",
    token: null,
    isToken: false,
    dataUserOne: null,
    loadingPass: false
}

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const { data } = await instanceAxios.get<{ members: ifUser[] }>("http://localhost:8080/api/members");
    const filterPeople = data.members.filter((item: ifUser) => item.role !== "admin");
    return filterPeople;
});

export const signup = createAsyncThunk("user/signup", async (dataSignup: ifSignup) => {
    const { data } = await instanceAxios.post<ifSignup>("http://localhost:8080/api/signup", dataSignup);
    return data;
});

export const signin = createAsyncThunk("user/signin", async (dataSignin: ifSignin) => {
    const { data } = await instanceAxios.post<ifSignin>("http://localhost:8080/api/signin", dataSignin);
    return data;
});

export const GetUser = createAsyncThunk("user/getUser", async (id: string) => {
    const { data } = await instanceAxios.get("http://localhost:8080/api/members/" + id);
    return data.user;
});

export const updateUser = createAsyncThunk("user/updateUser", async (dataUpdate: ifUserUpdate) => {
    const { data } = await instanceAxios.put("http://localhost:8080/api/members", dataUpdate);
    return data;
});


export const changePassUser = createAsyncThunk("user/changePassUser", async (dataUpdate: ifUserUpgrade) => {
    const { data } = await instanceAxios.post("http://localhost:8080/api/changePassword", dataUpdate);
    return data;
});

export const VeryPass = createAsyncThunk("user/VeryPass", async (email: string) => {
    const { data } = await instanceAxios.post("http://localhost:8080/api/VeryPass", email);
    return data;
});

export const sendPass = createAsyncThunk("user/VeryPass", async (dataPass: any) => {
    const { data } = await instanceAxios.post("http://localhost:8080/api/sendPass", dataPass);
    return data;
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
        resetUser: (state, action) => {
            state.dataUserOne = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.rejected, (state) => {
                state.loading = false

            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(GetUser.pending, (state) => {
                state.loading = true

            })
            .addCase(GetUser.rejected, (state) => {
                state.loading = false

            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.dataUserOne = action.payload;
            })
            .addCase(changePassUser.pending, (state) => {
                state.loadingPass = true

            })
            .addCase(changePassUser.rejected, (state) => {
                state.loadingPass = false

            })
            .addCase(changePassUser.fulfilled, (state) => {
                state.loadingPass = false

            })
    }
})

export const { checkToken, setToken, resetUser } = userReducer.actions

export default userReducer.reducer;