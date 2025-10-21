import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    airingToday: null,
    onTheAir: null,
    popularTV: null,
    topRatedTV: null,
    trailerVideo: null,
    movieCast: null,
    watchlist: [],
  },
  reducers: {
    addAiringToday: (state, action) => {
      state.airingToday = action.payload;
    },
    addOnTheAir: (state, action) => {
      state.onTheAir = action.payload;
    },
    addPopularTV: (state, action) => {
      state.popularTV = action.payload;
    },
    addTopRatedTV: (state, action) => {
      state.topRatedTV = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovieCast: (state, action) => {
      state.movieCast = action.payload;
    },
    addToWatchlist: (state, action) => {
      const exists = state.watchlist.find((m) => m.id === action.payload.id);
      if (!exists) state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (m) => m.id !== action.payload.id
      );
    },
  },
});

export const {
  addAiringToday,
  addOnTheAir,
  addPopularTV,
  addTopRatedTV,
  addTrailerVideo,
  addMovieCast,
  addToWatchlist,
  removeFromWatchlist,
} = tvSlice.actions;

export default tvSlice.reducer;
