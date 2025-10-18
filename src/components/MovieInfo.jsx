import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../utils/movieSlice";
import { useParams } from "react-router-dom";
import { TMDB_Img } from "../utils/constants";
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import Header from "./Header";
import MovieInfoShimmer from "./MovieInfoShimmer";
import useMovieInfo from "../hooks/useMovieInfo";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieInfo = () => {
  const { id } = useParams();
  const { movie, cast, getMovieDetails, getMovieCast } = useMovieInfo(id);
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.movies.watchlist);

  const isInWatchlist = movie && watchlist.some((m) => m.id === movie.id);

  // Trailer modal state
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch trailer when needed
  useMovieTrailer(id);
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getMovieDetails();
    getMovieCast();
  }, [id]);

  if (!movie) return <MovieInfoShimmer />;

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Header />

      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-105"
        src={TMDB_Img + (movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Movie Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col md:flex-row items-start gap-6 md:gap-10">
        {/* Poster */}
        <img
          src={`${TMDB_Img}${movie.poster_path}`}
          alt={movie.title}
          className="w-40 sm:w-56 md:w-80 rounded-2xl shadow-2xl flex-shrink-0"
        />

        {/* Movie Details */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-bold mb-2 sm:mb-3">
            {movie.title}{" "}
            <span className="text-gray-400 text-base sm:text-lg md:text-2xl">
              ({movie.release_date?.split("-")[0]})
            </span>
          </h1>

          <div className="flex flex-wrap items-center text-xs sm:text-sm md:text-base text-gray-300 gap-2 sm:gap-3 mb-3">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            {movie.runtime && <span>• {movie.runtime} min</span>}
            {movie.original_language && (
              <span>• {movie.original_language?.toUpperCase()}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="border text-gray-300 border-gray-500/60 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed max-w-full sm:max-w-2xl">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition"
              onClick={() => setShowTrailer(true)}
            >
              <FaPlay /> Watch Trailer
            </button>
            <button
              className="flex items-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition"
              onClick={() => {
                if (!movie) return;
                if (isInWatchlist) {
                  dispatch(removeFromWatchlist(movie));
                } else {
                  dispatch(addToWatchlist(movie));
                }
              }}
            >
              {isInWatchlist ? <FaMinus /> : <FaPlus />}
              {isInWatchlist ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      </div>

  

      {/* Cast Section */}
      <div className="relative max-w-6xl mx-auto px-6 pb-20 mt-12">
        <h2 className="text-3xl font-semibold text-white mb-6">Top Cast</h2>
        <div className="relative group">
          <div
            className="flex overflow-x-auto gap-10 scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {cast
              ?.filter((member) => member.profile_path)
              .map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center text-center min-w-[120px]"
                >
                  <img
                    src={TMDB_Img + member.profile_path}
                    alt={member.name}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-center object-cover shadow-lg border-2 border-gray-700"
                  />
                  <p className="text-white text-sm md:text-base font-medium mt-2">
                    {member.name}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm mt-1">
                    {member.character}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerVideo && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => setShowTrailer(false)}
          >
            ✕
          </button>
          <iframe
            className="w-full max-w-4xl h-[60vh] sm:h-[70vh] md:h-[80vh]"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=1&modestbranding=1`}
            title="Trailer"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
