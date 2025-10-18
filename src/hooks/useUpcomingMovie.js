import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovie = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUpcomingMovie();
  }, []);

  const getUpcomingMovie = async () => {
    const upcomingMovie = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await upcomingMovie.json();
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcomingMovie;
