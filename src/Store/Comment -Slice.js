import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment-slice",
  initialState: {
    isRenderComment: false,
    showDelete: false,
  },
  reducers: {
    setIsRenderComment(state) {
      state.isRenderComment = !state.isRenderComment;
    },
    setShowDelete(state, actions) {
      state.showDelete = actions.payload;
    },
  },
});

export const commentActions = commentSlice.actions;
export const commentReducers = commentSlice.reducer;
