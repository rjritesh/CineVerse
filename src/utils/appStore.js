import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import moviesReducer from "./movieSlice";
import tvReducer from "./tvSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    tv: tvReducer,
  },
});
export default appStore;
