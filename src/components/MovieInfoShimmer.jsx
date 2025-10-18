import React from "react";
import Header from "./Header";

const MovieInfoShimmer = () => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <Header />

      {/* Full-screen shimmer container */}
      <div className="relative flex flex-col md:flex-row items-start gap-10 p-6 md:p-12 mt-6">
        {/* Poster Shimmer */}
        <div className="w-64 md:w-80 h-96 bg-gray-800 animate-pulse rounded-2xl shadow-2xl flex-shrink-0"></div>

        {/* Info Shimmer */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title */}
          <div className="h-12 md:h-16 bg-gray-800 animate-pulse rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 animate-pulse rounded w-1/4 mt-2"></div>

          {/* Stats */}
          <div className="flex gap-2 mt-4">
            <div className="h-6 w-20 bg-gray-700 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-700 animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-gray-700 animate-pulse rounded"></div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-700 animate-pulse rounded"></div>
            ))}
          </div>

          {/* Overview */}
          <div className="h-48 bg-gray-800 animate-pulse rounded mt-4 w-full"></div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <div className="h-10 w-32 bg-gray-700 animate-pulse rounded"></div>
            <div className="h-10 w-32 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoShimmer;
