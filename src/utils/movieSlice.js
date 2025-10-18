import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    topRatedMovies: null,
    trailerVideo: null,
    movieCast: null,
    watchlist: [],
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovieCast: (state, action) => {
      state.movieCast = action.payload;
    },
    addToWatchlist: (state, action) => {
      // only add if movie not already in watchlist
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
  addNowPlayingMovies,
  addTrailerVideo,
  addUpcomingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addMovieCast,
  addToWatchlist,
  removeFromWatchlist,
} = movieSlice.actions;
export default movieSlice.reducer;
