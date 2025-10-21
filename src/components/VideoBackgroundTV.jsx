import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgroundTV = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[90vh] lg:h-screen overflow-hidden rounded">
      <iframe
        className="absolute   left-0 w-full h-[120%] -top-[20%] sm:top-0 border-0"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
        title="Movie Trailer"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 pointer-events-none"></div>
    </div>


  );
};

export default VideoBackgroundTV;
