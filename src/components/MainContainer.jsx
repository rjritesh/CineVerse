import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen -mt-16 sm:-mt-13">
      {/* Full height video */}
      <div className="relative w-full h-[75vh] sm:h-[90vh] overflow-hidden">
        <VideoBackground movieId={id} />

        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-12">
          <VideoTitle title={title} overview={overview} id={id} />
        </div>

        {/* Dark gradient for blending */}

      </div>

      {/* Bottom gradient to blend with black background */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MainContainer;
