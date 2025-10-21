import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuLoaderPinwheel } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import genAI from "../utils/genAI";
import { API_OPTIONS } from "../utils/constants";
import Footer from "../components/Footer";

const AiSearchPage = () => {
  const [aiSuggestedMovie, setAiSuggestedMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchText = useRef(null);
  const navigate = useNavigate();

  const tmdbSearchMovie = async (movie) => {
    const searchedMovie = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await searchedMovie.json();
    return data.results;
  };

  const handleAISearchClick = async () => {
    setLoading(true);
    setAiSuggestedMovie([]);
    const query = searchText.current.value.trim();
    if (!query) return setLoading(false);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert movie recommendation system. 
You know all movies across genres, languages, decades, and moods. 
Based on the user query: "${query}", suggest exactly 6 movies that best match the query.
- Only return the movie names.
- Separate them with commas.
- If possible, include diverse genres and popular titles.
- Do not include numbering, extra text, or duplicates.
  `;

    const result = await model.generateContent(prompt);
    const movieNames = result.response
      .text()
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    const tmdbResults = await Promise.all(movieNames.map(tmdbSearchMovie));
    const allMovies = tmdbResults.flat();

    // ✅ Filter only movies that have posters
    const validMovies = allMovies.filter((movie) => movie.poster_path);

    setAiSuggestedMovie(validMovies);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#031243] to-[#35012d] text-white font-montserrat"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <Header />

      {/* Search Section */}
      <div className="px-6 py-12 max-w-9xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl text-gray-200 font-bold mb-4">
          CineVerse AI Search
        </h1>
        <p className="text-gray-300 mb-8 text-s">
          Explore movies, actors, and genres instantly with AI recommendations
        </p>

        <div className="flex justify-center items-center max-w-3xl mx-auto shadow-lg rounded-full overflow-hidden border border-gray-700">
          <input
            type="text"
            ref={searchText}
            placeholder="Search any movie, actor, or genre..."
            className="flex-1 px-6 py-3 text-gray-200 bg-gray-900 outline-none text-lg placeholder-gray-400 transition"
          />
          <button
            className="flex items-center justify-center bg-gradient-to-r px-6 py-5 text-white font-semibold transition-all bg-gray-700 hover:bg-gray-600 cursor-pointer"
            onClick={handleAISearchClick}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <LuLoaderPinwheel className="text-gray-300 text-5xl animate-spin" />
          </div>
        ) : aiSuggestedMovie.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No recommendations yet. Try searching above.
          </p>
        ) : (
          aiSuggestedMovie.map((movie, i) => (
            <div
              key={i}
              onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="object-cover w-full h-full"
                />
              </div>

            </div>
          ))
        )}
      </div>

      {/* AI Tips Section */}
      <div className="max-w-4xl mx-auto mt-40 mb-20 text-center bg-gray-900/50 rounded-xl p-5 shadow-lg px-3">
        <p className="text-gray-300 text-sm leading-relaxed">
          Try searching for genres, actors, or moods. CineVerse AI will suggest the
          best movies tailored to your preferences. Use keywords like "action",
          "romantic", or "thriller" for better results.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AiSearchPage;
