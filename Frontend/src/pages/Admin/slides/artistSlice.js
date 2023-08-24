import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ArtistService from "../Artist/Artist.service";

export const getArtists = createAsyncThunk(
  // "artist/get-products",
  "/artist",
  async (thunkAPI) => {
    try {
      return await ArtistService.getArtists();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addArtist = createAsyncThunk(
  "artist/add-artist",
  async (artistData, thunkAPI) => {
    try {
      return await ArtistService.addArtist(artistData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  artists: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addArtist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArtist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(addArtist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default artistSlice.reducer;