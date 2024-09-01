import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../redux/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
