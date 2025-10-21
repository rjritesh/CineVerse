import { useSelector, useDispatch } from "react-redux";
import { removeFromWatchlist } from "../utils/movieSlice";
import { FaPlay, FaTrash, FaRegSadTear, FaRegSmile } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

const Watchlist = () => {
  const watchlist = useSelector((store) => store.movies.watchlist);
  const dispatch = useDispatch();

  // Empty Watchlist
  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#031243] to-[#35012d] text-white font-[Montserrat,sans-serif]">
        {/* Header stays at top */}
        <Header />

        {/* Empty state message centered below header */}
        <div className="flex flex-col items-center justify-center mt-32 px-6">
          <FaRegSadTear className="text-6xl text-gray-500 mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-6xl text-gray-300 font-bold mb-4 text-center">
            Your Watchlist is Empty!
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-6 text-center">
            Looks like you're too picky or just lazy.
          </p>
          <p className="text-gray-400 text-lg md:text-xl text-center">
            Add some movies before your future self judges you.{" "}
            <FaRegSmile className="inline ml-2" />
          </p>
        </div>
      </div>
    );
  };

  // Watchlist with movies
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#031243] to-[#35012d] text-white font-[Montserrat,sans-serif]">
      <Header />
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-4 hover:scale-105 transform transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h2 className="text-lg font-bold mb-2 text-center">{movie.title}</h2>
              <p className="text-gray-300 text-sm line-clamp-3 mb-2 text-center">
                {movie.overview}
              </p>
              <p className="text-yellow-400 font-semibold mb-4">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-md hover:bg-green-500 transition text-sm">
                  <FaPlay /> Play
                </button>
                <button
                  className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-md hover:bg-red-500 transition text-sm"
                  onClick={() => dispatch(removeFromWatchlist(movie))}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer></Footer>
    </div>
  );
};

export default Watchlist;
