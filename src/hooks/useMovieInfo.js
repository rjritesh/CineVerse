import { useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieInfo = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  // Fetch movie details
  const getMovieDetails = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const data = await res.json();
    setMovie(data);
  };

  // Fetch cast
  const getMovieCast = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      API_OPTIONS
    );
    const data = await res.json();
    setCast(data.cast);
  };

  return { movie, cast, getMovieDetails, getMovieCast };
};

export default useMovieInfo;
