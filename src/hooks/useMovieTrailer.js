import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return; // avoid undefined movieId

    const getMoviesVideo = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const json = await response.json();

      if (!json.results) return;

      const trailer = json.results.find((video) => video.type === "Trailer");

      if (trailer) dispatch(addTrailerVideo(trailer));
    };

    getMoviesVideo();
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
