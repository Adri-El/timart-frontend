import { createSlice } from "@reduxjs/toolkit";

const preloaderSlice = createSlice({
  name: "preloader-slice",
  initialState: {
    loaderShow: false,
  },
  reducers: {
    loaderShowHandler(state, actions) {
      state.loaderShow = actions.payload;
    },
  },
});

export const preloaderActions = preloaderSlice.actions;
export const preloaderReducers = preloaderSlice.reducer;
