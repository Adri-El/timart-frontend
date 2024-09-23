import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error-slice",
  initialState: {
    showError: false,
    errMsg: "",
  },
  reducers: {
    setShowError(state, actions) {
      state.showError = actions.payload;
    },
    setErrMsg(state, actions) {
      state.errMsg = actions.payload;
    },
  },
});

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
