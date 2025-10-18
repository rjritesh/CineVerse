
import { useSelector } from "react-redux"
import MoviesCategories from "./MoviesCategories"

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies)
  return (
    <div className="flex flex-col gap-8 bg-black"> {/* Use gap instead of margin */}
      <MoviesCategories title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MoviesCategories title="Popular Movies" movies={movies?.popularMovies} />
      <MoviesCategories title="Top Rated Movies" movies={movies?.topRatedMovies} />
      <MoviesCategories title="Upcoming Movies" movies={movies?.upcomingMovies} />
    </div>

  )
}

export default SecondaryContainer