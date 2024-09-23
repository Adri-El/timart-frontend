import { configureStore } from "@reduxjs/toolkit";
import { commentReducers } from "./Comment -Slice";
import { cartReducers } from "./Cart-Item-slice";
import { preloaderReducers } from "./Preloader-Slice";
import { errorReducer } from "./Error-Slice";
const store = configureStore({
  reducer: {
    cart: cartReducers,
    loader: preloaderReducers,
    error: errorReducer,
    comment: commentReducers,
  },
});

export default store;
