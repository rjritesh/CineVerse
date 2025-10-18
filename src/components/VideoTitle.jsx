import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, id }) => {
  const navigate = useNavigate();

  return (
    <div className="text-white w-full max-w-4xl px-2 sm:px-6 md:px-12">
      {/* Title: hidden on small screens */}
      <h1 className="hidden sm:block text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
        {title}
      </h1>

      {/* Overview: hidden on small screens */}
      <p className="hidden sm:block text-base md:text-lg mb-6 drop-shadow-md leading-relaxed">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex flex-row gap-2 sm:gap-4">
        <button
          className="flex items-center justify-center gap-1 sm:gap-2 bg-white text-black px-2 py-1 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-gray-300 transition text-xs sm:text-base shadow-md cursor-pointer"
          onClick={() => navigate(`/movie/${id}`)}
        >
          <FaPlay className="text-[11px] sm:text-[14px]" /> Play
        </button>

        <button
          className="flex items-center justify-center gap-1 sm:gap-2 bg-gray-700 bg-opacity-60 text-white px-2 py-1 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-gray-600 transition text-xs sm:text-base shadow-md cursor-pointer"
          onClick={() => navigate(`/movie/${id}`)}
        >
          <AiOutlineInfoCircle className="text-[11px] sm:text-[16px]" /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
