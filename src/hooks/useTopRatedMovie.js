import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovie = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTopRatedMovie();
  }, []);

  const getTopRatedMovie = async () => {
    const topratedmovie = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await topratedmovie.json();
    dispatch(addTopRatedMovies(json.results));
  };
};

export default useTopRatedMovie;
