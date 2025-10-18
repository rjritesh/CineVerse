import useNowPlayingMovies from "../hooks/useNowPlayingMovie";
import usePopularMovie from "../hooks/usePopularMovie";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import useUpcomingMovie from "../hooks/useUpcomingMovie";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovie();
  useTopRatedMovie();
  useUpcomingMovie();

  return (
    <div className="bg-black min-h-screen text-white font-[Montserrat,sans-serif]">
      <Header />

      <MainContainer />

      {/* Pull the secondary container up so it overlaps the video bottom */}
      <div className="-mt-70 sm:-mt-28 relative z-10">
        <SecondaryContainer />
      </div>


    </div>
  );
};

export default Browse;
